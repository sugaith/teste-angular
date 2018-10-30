import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {
    Link,withRouter,
} from "react-router-dom";

//CSS e CONSTS
import '../style/TabPrioris.css';
import * as GLOBALS from '../../../src/config/GLOBALS'
import InputAdornment from "@material-ui/core/es/InputAdornment/InputAdornment";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
const globals = GLOBALS.globals;

export default class CrudUser extends Component {
    state = {
        nome: "",
        sobrenome: "",
        email: "",
        sexo: "H",
        cidade: "",
        estado: "",
        datacad: "",
        area_form: "",
        profissao: "",
    };
    constructor(props) {
        super(props);
    }
    componentDidMount(){

        if (this.props.userSel.id !== undefined){
            let aux = this.props.userSel;

            this.setState({
                nome: aux.nome ,
                sobrenome: aux.sobrenome ,
                email: aux.email ,
                sexo: aux.sexo ,
                cidade: aux.cidade ,
                estado: aux.estado ,
                datacad: aux.datacad ,
                area_form: aux.area_form ,
                profissao: aux.profissao ,

                user: this.props.userSel
            });

        }

    }

    componentWillReceiveProps(newProps, newp2){
    }



    render() {
        const sexo_list = [
            {
                value: 'M',
                label: 'Mulher',
            },
            {
                value: 'H',
                label: 'Homem',
            },
        ];

        const estado_list = [
            {
                value: 'PR',
                label: 'Parana',
            },
            {
                value: 'SC',
                label: 'Santa Catarina',
            },
        ];
        const profis_list = [
            {
                value: 'FullStack',
                label: 'FullStack',
            },
            {
                value: 'Administrador',
                label: 'Administrador',
            },
            {
                value: 'Massagista',
                label: 'Massagista',
            },
        ];

        let cidade_list = [];

        if (this.state.estado==='PR'){
            cidade_list = [
                {
                    value: 'Maringa',
                    label: 'Maringa',
                },
                {
                    value: 'Foz',
                    label: 'Foz',
                },
                {
                    value: 'Curitiba',
                    label: 'Curitiba',
                },
            ];
        }else {
            cidade_list = [
                {
                    value: 'Joenville',
                    label: 'Joenville',
                },
                {
                    value: 'Floripa',
                    label: 'Floripa',
                },
                {
                    value: 'Guarda',
                    label: 'Guarda',
                },
            ];
        }



        return (
            <div>
                { !(this.props.userSel.id === undefined) && (
                    <Button variant="contained" color="primary"
                            onClick={(event) => {
                                this.negocioDeleta(this.props.userSel);
                            }}
                    >
                        Delete
                    </Button>
                )}


                <div className="priContainer" style={{}}>
                    <div>
                        <TextField
                            id="outlined-search"
                            label="Nome"
                            //type="search"
                            // className={classes.textField}
                            style={{backgroundColor: 'white'}}
                            margin="normal"
                            variant="outlined"
                            value={this.state.nome}
                            onChange={(e) => {
                                this.setState({nome: e.target.value})
                            }}
                        />
                        <TextField
                            id="outlined-search"
                            label="Sobrenome"
                            //type="search"
                            // className={classes.textField}
                            style={{backgroundColor: 'white'}}
                            margin="normal"
                            variant="outlined"
                            value={this.state.sobrenome}
                            onChange={(e) => {
                                this.setState({sobrenome: e.target.value})
                            }}
                        />
                        <TextField
                            id="outlined-search"
                            label="email"
                            //type="search"
                            // className={classes.textField}
                            style={{backgroundColor: 'white'}}
                            margin="normal"
                            variant="outlined"
                            value={this.state.email}
                            onChange={(e) => {
                                this.setState({email: e.target.value})
                            }}
                        />


                        <Typography style={{ }}>
                            {"Selects:"}
                        </Typography>

                    </div>

                    <div style={{marginLeft: '15px'}}>
                        {/*sexo*/}
                        <TextField
                            style={{marginLeft: '5px', width: '130px'}}
                            select
                            // className={classNames(classes.margin, classes.textField)}
                            variant="filled"
                            label="Sexo"
                            value={this.state.sexo}
                            onChange={(val)=>{
                                console.log(val);
                                this.setState({sexo: val.target.value});
                            }}
                        >
                            {sexo_list.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        {/*estado*/}
                        <TextField
                             style={{marginLeft: '5px', width: '130px'}}
                            select
                            // className={classNames(classes.margin, classes.textField)}
                            variant="filled"
                            label="Estado"
                            value={this.state.estado}
                            onChange={(val)=>{
                                console.log(val);
                                this.setState({estado: val.target.value});
                            }}
                        >
                            {estado_list.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        {/*cidade*/}
                        <TextField
                             style={{marginLeft: '5px', width: '130px'}}
                            select
                            // className={classNames(classes.margin, classes.textField)}
                            variant="filled"
                            label="Cidade"
                            value={this.state.cidade}
                            onChange={(val)=>{
                                console.log(val);
                                this.setState({cidade: val.target.value});
                            }}
                        >
                            {cidade_list.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        {/*profissao*/}
                        <TextField
                             style={{marginLeft: '5px', width: '130px'}}
                            select
                            // className={classNames(classes.margin, classes.textField)}
                            variant="filled"
                            label="Profissão"
                            value={this.state.profissao}
                            onChange={(val)=>{
                                console.log(val);
                                this.setState({profissao: val.target.value});
                            }}
                        >
                            {profis_list.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>



                    </div>
                    {/*SALVAR BOTAO*/}
                    <Button style={{marginTop: '10px'}}
                        variant="contained" color="primary"
                            onClick={(event) => {
                                //confere campos vazios
                                if(
                                    this.state.nome === ""||
                                    this.state.sobrenome === ""||
                                    this.state.email === ""||
                                    this.state.cidade === ""||
                                    this.state.estado === ""||
                                    this.state.profissao === ""
                                ){
                                    alert("Todos os campos sao obrigatorios")
                                    return;
                                }

                                //confere email..
                                if ( ! this.isEmailValid(this.state.email) ){
                                    alert("Email invalido")
                                    return;
                                }

                                //regra insere ou atualiza
                                 if (this.props.userSel.id === undefined){
                                     this.negocioInsere();
                                 }else{
                                     this.negocioAtualiza();
                                 }

                            }}
                    >
                        SALVAR
                    </Button>
                </div>
            </div>

        );
    }

    isEmailValid = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(text) === false)
        {
            console.log("Email Not Correct");
            // this.setState({email:text});
            return false;
        }else {
            this.setState({email:text})
            console.log("Email Correct");
            return true;
        }
    };

    negocioAtualiza(){

        let user = {
            id: this.props.userSel.id,
            nome: this.state.nome,
            sobrenome: this.state.sobrenome,
            email: this.state.email,
            sexo: this.state.sexo,
            cidade: this.state.cidade,
            estado: this.state.estado,
            datacad: this.state.datacad,
            area_form: this.state.area_form,
            profissao: this.state.profissao,
        };

        console.log(" negocioAtualiza::::::");
        fetch(globals.BASE_URL + "/teste/atualiza/", {
            method: 'POST',
            headers: {
                //  'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: user,
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(":::: resp negocioAtualiza ::::");
                console.log(responseJson);

                if (responseJson.error === 'error'){
                    alert(responseJson.msg);
                }else{
                    alert("Usuaro Atualizado");
                    this.props.close();
                }

                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    negocioInsere(){

        let user = {
            nome: this.state.nome,
            sobrenome: this.state.sobrenome,
            email: this.state.email,
            sexo: this.state.sexo,
            cidade: this.state.cidade,
            estado: this.state.estado,
            datacad: this.state.datacad,
            area_form: this.state.area_form,
            profissao: this.state.profissao,
        };

        console.log(" negocioInsere::::::");
        fetch(globals.BASE_URL + "/teste/insere/", {
            method: 'POST',
            headers: {
                //  'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: user,
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(":::: resp negocioInsere ::::");
                console.log(responseJson);

                if (responseJson.error === 'error'){
                    alert(responseJson.msg);
                }else{
                    alert("Usuaro Inserido");
                    this.props.close();
                }

                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    negocioDeleta(user) {
        console.log(" negocioDeleta::::::");
        fetch(globals.BASE_URL + "/teste/deleta/", {
            method: 'POST',
            headers: {
              //  'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: user,
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(":::: resp negocioDeleta ::::");
                console.log(responseJson);

                if (responseJson.error === 'error'){
                    alert(responseJson.msg);
                }else{
                    alert("Usuaro deletado");
                    this.props.close();
                }

                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }
}


const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // textAlign: 'center',
        paddingTop: '20px',
        // height: '90vh',
         backgroundColor: 'white'

    },
    article: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        // margin: '4px',
        // marginTop: '20px',
        padding: '5px',
        borderRadius: '7pt',
        // backgroundColor: '#222',
        backgroundColor: 'white',
    },

}


