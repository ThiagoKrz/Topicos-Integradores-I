<?php
include "../Conection.php";
try {
    $nome      = $_POST["nome"];
    $email     = $_POST["email"];
    $telefone     = $_POST["telefone"];

    $sql = "INSERT INTO fornecedor (nome, email, telefone) " .
        "VALUES ('{$nome}','{$email}','{$telefone}');";
    $pdo->prepare($sql)->execute();
    echo "true";
} catch (PDOException $e) {
    echo $e->getMessage();
}
