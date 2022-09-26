<?php
include '../Conection.php';
try {
    $id = $_POST['id'];
    $sql = "DELETE from usuario where id = {$id};";
    $pdo->prepare($sql)->execute();
    echo "true";
} catch (PDOException $e) {
    var_dump($e->getMessage());
}
