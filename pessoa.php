<?php
include_once "./config.php";
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Controle pessoa</title>
    <?php include_once "csscadastro.php"; ?>
</head>

<body class="hold-transition dark-mode sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed">
    <div class="wrapper">
        <?php include_once "menu_topo.php"; ?>
        <?php include_once "menu_lateral.php"; ?>
        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Content Header (Page header) -->
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Controle de pessoa</h1>
                        </div><!-- /.col -->
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="painel">Início</a></li>
                                <li class="breadcrumb-item"><a href="listapessoa">Listagem</a></li>
                                <li class="breadcrumb-item active">Controle</li>
                            </ol>
                        </div><!-- /.col -->
                    </div><!-- /.row -->
                </div><!-- /.container-fluid -->
            </div>
            <!-- /.content-header -->

            <!-- Main content -->
            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <!-- left column -->
                        <div class="col-12">
                            <!-- jquery validation -->
                            <div class="card card-primary">
                                <div class="card-header">
                                    <div class="card-title">
                                        <a class="btn btn-warning" href="listapessoa"><i class="fas fa-chevron-left"> </i> Voltar</a>
                                    </div>
                                </div>
                                <!-- /.card-header -->
                                <!-- form start -->
                                <form method="post" id="form" name="form">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-12">
                                                <?php include_once "alerta.php"; ?>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="form-group col-lg-3 col-md-6 col-sm-12">
                                                <label for="cnpj">CPF | CNPJ *</label>
                                                <input required type="text" name="cnpj" class="form-control" id="cnpj" placeholder="Por favor digite o CNPJ.">
                                            </div>
                                            <div class="form-group col-lg-4 col-md-6 col-sm-12">
                                                <label for="nome_fantasia">Nome | nome fantasia *</label>
                                                <input required type="text" name="nome_fantasia" class="form-control" id="nome_fantasia" placeholder="Digite o nome ou nome fantasia.">
                                            </div>
                                            <div class="form-group col-lg-5 col-md-6 col-sm-12">
                                                <label for="razao_social">Sobre nome | razão social *</label>
                                                <input required type="text" name="razao_social" class="form-control" id="razao_social" placeholder="Digite o sobre nome ou razão social.">
                                            </div>
                                            <div class="form-group col-lg-4 col-md-6 col-sm-12">
                                                <label for="rg_ie">RG | IE *</label>
                                                <input required type="text" name="rg_ie" class="form-control" id="rg_ie" placeholder="Digite o RG ou IE.">
                                            </div>
                                            <div class="form-group col-lg-4 col-md-6 col-sm-12">
                                                <label for="data_inicio_atividade">Nascimento | Fundação</label>
                                                <input type="text" name="data_inicio_atividade" class="form-control" id="data_inicio_atividade" placeholder="Data de nascimento ou fundação.">
                                            </div>
                                            <div class="custom-control custom-checkbox col-lg-4 col-md-6 col-sm-12 mt-4">
                                                <input class="custom-control-input" type="checkbox" id="customCheckbox2" checked>
                                                <label for="customCheckbox2" class="custom-control-label">É a matriz?</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <button id="btnsalvar" name="btnsalvar" type="button" class="btn btn-success"><i class="fas fa-save"> </i> Salvar</button>
                                    </div>
                                </form>
                            </div>
                            <!-- /.card -->
                        </div>
                    </div>
                    <!-- /.row -->
                </div><!-- /.container-fluid -->
            </div>
            <!-- /.content -->
        </div>
        <?php include_once "footer.php"; ?>
    </div>
    <?php include_once "scriptcadastro.php"; ?>
    <script src="js/pessoa.js"></script>
    <script src="js/alerta.js"></script>
</body>

</html>