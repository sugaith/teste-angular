<?php

/**
 * Created by PhpStorm.
 * User: thiago correa
 */
class DaoTeste
{
    public $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function consultaTodos(){

        $sth = $this->db->prepare("SELECT * FROM teste where ativo = '1'");
        $sth->execute();
        $todos = $sth->fetchAll();

        return $todos;
    }

    public function update($user)
    {

        $sql = "UPDATE teste SET   
                  nome = '{$user['nome']}', 
                  sobrenome = '{$user['sobrenome']}', 
                  email = '{$user['email']}',
                  sexo = '{$user{sexo}}',
                  datacad = '{$user['datacad']}',
                  area_form = '{$user['area_form']}',               
                  profissao = '{$user['profissao']}',
                  cidade = '{$user['cidade']}',
                  estado = '{$user['estado']}'
                  
                  WHERE id = {$user['id']}";

        try {
            $sth = $this->db->prepare($sql);
            $sth->execute();

            return $user;


        }catch(PDOException $e){
            $erro = [];
            $erro['error'] = "error";
            $erro['msg'] = $sql . "<br>" . $e->getMessage();
            return $erro;
        }
    }

    public function deleta($user)
    {

        $sql = "UPDATE teste SET   
                  ativo = '0'
                  WHERE id = {$user['id']}";

        try {
            $sth = $this->db->prepare($sql);
            $sth->execute();

            return $user;


        }catch(PDOException $e){
            $erro = [];
            $erro['error'] = "error";
            $erro['msg'] = $sql . "<br>" . $e->getMessage();
            return $erro;
        }
    }

    public function insere($user)    {
        $sql = "INSERT INTO teste (nome, sobrenome, email, sexo, datacad, area_form, profissao, cidade, estado )
                VALUES ( '{$user['nome']}', '{$user['sobrenome']}', '{$user['email']}', 
                         '{$user['sexo']}', '{$user['datacad']}', '{$user['area_form']}', '{$user['profissao']}',
                         '{$user['cidade']}','{$user['estado']}')";

        try {
            $sth = $this->db->prepare($sql);
            $sth->execute();
            $last_id = $this->db->lastInsertId();

            if ($last_id > 0){
                return $last_id;
            }else{
                $erro = [];
                $erro['error'] = "warn";
                $erro['msg'] = "Error on registering user";
                return $erro;
            }

        }catch(PDOException $e){
            $erro = [];
            $erro['error'] = "error";
            $erro['msg'] = $sql . "<br>" . $e->getMessage();
            return $erro;
        }
    }


}