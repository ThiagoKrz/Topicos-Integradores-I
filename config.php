<?php
if (session_status() !== PHP_SESSION_ACTIVE) :
    session_start();
endif;
#ARMAZENA O ID DO ULTIMO ATENDIMENTO.
//define("ULTIMO_ATENDIMENTO",isset($_SESSION["IDATENDIMENTO"]) ? $_SESSION["IDATENDIMENTO"] : null );
function __autoload($nomeClasse)
{
    include_once './classes/' . $nomeClasse . '.class.php';
}
$modulo = Url::getURL(0);
//SETAMOS COMO DEFAULT O TIME ZONE DE PORTO VELHO.
date_default_timezone_set('America/Porto_Velho');
function dateConvert($dateSql)
{
    $ano = substr($dateSql, 6, 4);
    $mes = substr($dateSql, 3, 2);
    $dia = substr($dateSql, 0, 2);
    return $ano . "-" . $mes . "-" . $dia;
}
function dateConvertBr($dateSql)
{
    $ano = substr($dateSql, 0, 4);
    $mes = substr($dateSql, 5, 2);
    $dia = substr($dateSql, 8, 2);
    return $dia . "/" . $mes . "/" . $ano;
}
//constantes do projeto
define('EMAIL', [
    "host" => "smtp.gmail.com",
    "port" => 465,
    "usuario" => "seuemail@gmail.com",
    "senha" => "sua_senha"
]);

define('PROJETO', 'atron');
define('ICONE', 'imagens/icone.svg');
define('BASE_URL', 'https://localhost/');
define('HOME', BASE_URL . 'painel');
define('LOGIN', BASE_URL . 'login');
define('URL', BASE_URL);
define('BUSCA', BASE_URL . 'busca');
define('ERRO', BASE_URL . '404');
define('EMPRESA', 'Sua empresa'/*$empresa->FANTASIA*/);
if ($modulo == null or $modulo == '') :
    echo "<script>window.location.replace('" . HOME . "');</script>";
else :
    if (file_exists($modulo . ".php")) :
        include_once __DIR__ . DIRECTORY_SEPARATOR . $modulo . '.php';
    endif;
//echo "<script>window.location.replace('404.php');</script>";
endif;
