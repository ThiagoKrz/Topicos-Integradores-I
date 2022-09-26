<?php
include "../Conection.php";
try {
    $id      = $_POST["id"];
    $nome      = $_POST["nome"];
    $sobrenome = $_POST["sobrenome"];
    $cpf       = $_POST["cpf"];
    $telefone  = $_POST["telefone"];
    $email     = $_POST["email"];

    $sql = "UPDATE cliente SET " .
        " nome = '{$nome}'," .
        " sobre_nome = '{$sobrenome}'," .
        " cpf = '{$cpf}'," .
        " telefone = '{$telefone}'," .
        " email = '{$email}'" .
        " WHERE id = {$id}";
    $pdo->prepare($sql)->execute();
    echo "true";
} catch (PDOException $e) {
    echo $e->getMessage();
}
