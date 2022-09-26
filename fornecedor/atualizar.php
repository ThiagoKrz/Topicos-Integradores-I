<?php
include "../Conection.php";
try {
    $id      = $_POST["id"];
    $nome      = $_POST["nome"];
    $email     = $_POST["email"];
    $telefone     = $_POST["telefone"];

    $sql = "UPDATE fornecedor SET " .
        " nome = '{$nome}'," .
        " email = '{$email}'," .
        " telefone = '{$telefone}'" .
        " WHERE id = {$id}";
        
    $pdo->prepare($sql)->execute();
    echo "true";
} catch (PDOException $e) {
    echo $e->getMessage();
}
