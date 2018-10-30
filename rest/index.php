<?php
//objetos de response e request
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


//auto load do Slim.. obrigatorio
require '../vendor/autoload.php';
require 'DaoTeste.php';



//esta flag é para desenvolvimento, em produção voce vmai querer deixar todas em false, para que
// nao fique aparecendo erros e avisos aos usuarios finals e para que o tamanho do header nao seja divulgado
$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

//dados de conexao do banco de dados
$config['db']['host']   = 'localhost';
$config['db']['user']   = 'thiago';
$config['db']['pass']   = 'thiago123.';
$config['db']['dbname'] = 'elliottdb';


#$app = new \Slim\App; //use esta linha caso nao precise fas configuracoes
$app = new \Slim\App(['settings' => $config]);




//Container para instanciamento das classes. Todas as classes adicionadas e instanciadas no container
// sao acessiveis atravez de this->
$container = $app->getContainer();

$container['db'] = function ($c) {
    $db = $c['settings']['db'];
    $pdo = new PDO('mysql:host=' . $db['host'] . ';dbname=' . $db['dbname'],
        $db['user'], $db['pass']);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    return $pdo;
};
$container['avatar_dir'] = '/var/www/rest/src/public/avatarImgs';
$container['banners_dir'] = '/var/www/rest/src/public/bannersImgs';

//Abaixo são as rotas.. para mais info veja documentacao do SLIM..


//consulta todos
$app->get('/teste/consulta/todos/', function (Request $request, Response $response, array $args) {
    $db = new DaoTeste($this->db);

    return $response->withJson($db->consultaTodos());
});

//insere usuario
$app->post('/teste/insere/', function (Request $request, Response $response) {
    $data = $request->getParsedBody();

    $db = new DaoTeste($this->db);
    $id = $db->insere($data['user']);

    return $response->withJson( $id );
});

//update usuario
$app->post('/teste/atualiza/', function (Request $request, Response $response) {
    $data = $request->getParsedBody();

    $db = new DaoTeste($this->db);
    $user = $db->update($data['user']);

    return $response->withJson( $user );
});


//desativa (deleta) usuario
$app->post('/teste/deleta/', function (Request $request, Response $response) {
    $data = $request->getParsedBody();

    $db = new DaoTeste($this->db);
    $user = $db->deleta($data['user']);

    return $response->withJson( $user );
});



$app->run();