<?php
include "../Conection.php";
$usuarios = $pdo->query('select * from usuario;')->fetchAll();
$dados = "";
foreach ($usuarios as $key => $value) {
    $dados = $dados . "<tr id='tr" . $value['id'] . "'>" .
        "<td>" . $value['id'] . "</td>" .
        "<td>" . $value['nome'] . "</td>" .
        "<td>" . $value['sobre_nome'] . "</td>" .
        "<td>" . $value['email'] . "</td>" .
        "<td>" . $value['senha'] . "</td>" .
        "<td>" .
        "<div class='btn-group' role='group'>" .
        "<button type='button' onclick='alterar(" . json_encode($value) . ")' type='button' class='btn btn-warning'>" .
        "<i class='fa-solid fa-pen-to-square'> </i> Editar" .
        "</button>" .
        "<button onclick='deleta(" . $value['id'] . ");' type='button' class='btn btn-danger'>" .
        "<i class='fa-solid fa-trash'> </i> Excluir" .
        "</button>" .
        "</div>" .
        "</tr>";
}
echo $dados;
