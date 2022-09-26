<?php
include "../Conection.php";
try {
    $nome      = $_POST["nome"];
    $sobrenome = $_POST["sobrenome"];
    $email     = $_POST["email"];
    $senha     = $_POST["senha"];

    $sql = "INSERT INTO usuario (nome, sobre_nome, email, senha) " .
        "VALUES ('{$nome}','{$sobrenome}','{$email}','{$senha}');";
    $pdo->prepare($sql)->execute();
    echo "true";
} catch (PDOException $e) {
    echo $e->getMessage();
}
