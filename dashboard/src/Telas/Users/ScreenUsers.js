import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {HashRouter, Route} from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Modal from 'react-responsive-modal';

//MISC
import PropTypes from 'prop-types';

//CSS
import '../style/ScreenUserscss.css';
import CrudUser from './CrudUser'

//IMG imports
import smile from '../../img/avatar.png';

//consts
import * as GLOBALS from '../../config/GLOBALS'
const globals = GLOBALS.globals;


export default class ScreenUsers extends Component {

    state = {
        listaUsuarios: [],
        listaFiltroUsuarios: [],
        usuarioSelected: {},
        modalOpen: false,
    };
    constructor(props) {
        super(props);
        // this.state = {
        //     listaUsuarios: [],
        //     listaFiltroUsuarios: [],
        //
        //     modalOpen: false,
        //
        //
        //
        // };
        // this.handleClick = this.handleClick.bind(this);
    }

    onOpenModal = (user) => {
        this.setState({
            modalOpen: true,
            usuarioSelected: user,
        });
    };

    onCloseModal = () => {
        this.setState({
            modalOpen: false,
            usuarioSelected: {}
        });
        this.fetchUsuarios();
    };

    componentDidMount(){

        console.log("did mount USERSS::::");
        console.log(this.state.user);


        this.fetchUsuarios();
    }


    render() {
        // const  classes  = withStyles(styles)(ScreenUsers)

        return (
            <div className="precontainer">
                <Modal open={this.state.modalOpen} onClose={this.onCloseModal} center>
                    <div >
                        <CrudUser userSel={this.state.usuarioSelected} close={this.onCloseModal} />
                    </div>
                </Modal>
                <header className="header">
                    {/*<img  src={elliott_logo} width="100" alt="logo"/>*/}
                    <h1 className="App-title">Teste Theos</h1>
                    <TextField
                        id="outlined-search"
                        label="Busca"
                        type="search"
                        // className={classes.textField}
                        style={{backgroundColor: 'white'}}
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => this.filterList(e)}
                    />

                    <Button variant="contained" color="primary" style={{marginLeft: '10px'}}
                            onClick={(event) => {
                                this.negocioInsere();
                            }}
                    >
                        Inserir Novo
                    </Button>
                </header>

                {/*LISTA DE USUARIOS*/}
                <div className="root" >
                    <List className="list">
                        {this.state.listaFiltroUsuarios.map(user => (
                            <ListItem className="listItem" key={user.id} dense button
                                onClick={()=> this.onOpenModal(user)
                                }
                            >
                                <Avatar alt="Remy Sharp" src={smile} />
                                <ListItemText style={{width: '120px'}} primary={`${user.nome}`} />
                                <ListItemText style={{width: '120px'}} primary={`${user.sobrenome}`} />
                                <ListItemText style={{width: '10px'}} primary={`${user.email}`} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </div>
        );
    }

    negocioInsere() {
        this.onOpenModal( {} );
    }

    fetchUsuarios(){
        console.log(" fetchUsuarios::::::");
        fetch(globals.BASE_URL + "/teste/consulta/todos/", {
            method: 'GET',
            headers: {
                //'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({
            //     user: this.state.login,
            //     passw: this.state.passw,
            // }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(":::: resp fetchUsuarios ::::");
                console.log(responseJson);

                if (responseJson.error){
                    alert(responseJson.msg);
                }else{
                    this.setState({ listaUsuarios: responseJson });
                    this.setState({ listaFiltroUsuarios: responseJson });
                }

                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    };


    filterList(event) {
        var updatedList = this.state.listaUsuarios;
        updatedList = updatedList.filter(function(item){

            return item.nome.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1;
        });
        this.setState({listaFiltroUsuarios: updatedList});
    }


}