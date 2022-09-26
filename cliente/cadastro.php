<?php
include "../Conection.php";
try {
    $nome      = $_POST["nome"];
    $sobrenome = $_POST["sobrenome"];
    $cpf       = $_POST["cpf"];
    $telefone  = $_POST["telefone"];
    $email     = $_POST["email"];
    $sql = "INSERT INTO cliente(nome, sobre_nome, cpf, telefone, email) VALUES ('{$nome}','{$sobrenome}','{$cpf}','{$telefone}','{$email}');";
    $pdo->prepare($sql)->execute();
    echo "true";
} catch (PDOException $e) {
    echo $e->getMessage();
}
