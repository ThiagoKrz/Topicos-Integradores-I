<?php
include "../Conection.php";
try {
    $id      = $_POST["id"];
    $nome      = $_POST["nome"];
    $sobrenome = $_POST["sobrenome"];
    $email     = $_POST["email"];
    $senha     = $_POST["senha"];

    $sql = "UPDATE usuario SET " .
        " nome = '{$nome}'," .
        " sobre_nome = '{$sobrenome}'," .
        " email = '{$email}'," .
        " senha = '{$senha}'" .
        " WHERE id = {$id}";
        
    $pdo->prepare($sql)->execute();
    echo "true";
} catch (PDOException $e) {
    echo $e->getMessage();
}
