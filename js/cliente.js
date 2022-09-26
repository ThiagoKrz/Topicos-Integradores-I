const atualiza = document.querySelector("#btnatualiza");
const salvar = document.querySelector("#btnsalvar");

const alerta = document.querySelector("#alerta");
const titulo = document.querySelector("#titulo");
const carregando = document.querySelector("#carregando");
const cadastro = document.querySelector("#btncadastro");

//CONFIGURAÇÕES DOS PARAMENTRO DE VALIDAÇÃO DO FORMULÁRIO
$("#frmcliente").validate({
  //adiconamos regras de validação ao formulário
  rules: {
    //bloqueamos uma quantidade minima de caracteres
    //para o campo nome e sobre nome.
    nome: {
      minlength: 3,
    },
    sobrenome: {
      minlength: 3,
    },
  },
  //definimos que as mensagem de formulário serão adicionadas a uma tag
  // <span>Mensagem</span>
  errorElement: "span",
  errorPlacement: function (error, element) {
    error.addClass("invalid-feedback");
    element.closest(".form-group").append(error);
  },
  highlight: function (element, errorClass, validClass) {
    $(element).addClass("is-invalid");
  },
  unhighlight: function (element, errorClass, validClass) {
    $(element).removeClass("is-invalid");
    $(element).addClass("is-valid");
  },
});

async function deleta(id) {
  $("#id").val(id);

  const opt = {
    method: "POST",
    body: `id=${id}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    mode: "cors",
    cache: "default",
  };
  const response = await fetch("deletar.php", opt);
  const data = await response.text();
  if (data == "true") {
    $("#tr" + id).remove();
    alert("Removido");
  }
}
function alterar(cliente) {
  const id = cliente.id;
  const nome = cliente.nome;
  const sobreNome = cliente.sobre_nome;
  const cpf = cliente.cpf;
  const telefone = cliente.telefone;
  const email = cliente.email;

  $("#acao").val("update");
  $("#id").val(id);
  $("#nome").val(nome);
  $("#sobrenome").val(sobreNome);
  $("#cpf").val(cpf);
  $("#telefone").val(telefone);
  $("#email").val(email);
  $("#cadastrocliente").modal("show");
}

async function update() {
  const form = document.querySelector("#frmcliente");
  const formData = new FormData(form);

  const opt = {
    method: "POST",
    mode: "cors",
    body: formData,
    cache: "default",
  };
  const response = await fetch("atualizar.php", opt);
  const dados = await response.text();
  console.log(dados);
  console.log(dados);

  if (dados == "true") {
    alerta.className = "alert alert-success";
    titulo.className = "mb-0";
    titulo.innerHTML = `<p>Atualização realizada com sucesso!`;
    carregando.className = "mb-0 d-none";
    lista_cliente();
    setTimeout(() => {
      //fecha o modal
      $("#cadastrocliente").modal("hide");
      $("#frmcliente input").val("");
      $("#alerta").removeClass("alert alert-success");
      $("#alerta").addClass("alert alert-warning");
      $("#titulo").removeClass("d-none");
      $("#titulo").addClass("mb-0");
      titulo.innerHTML = `
            <h6 class="alert-heading">Atenção!</h6>
            Todos os campos com <span class="text-danger"> * </span> 
            são obrigatórios para o
            cadastro!`;
    }, 1000);
  } else {
    titulo.className = `mb-0`;
    titulo.innerHTML = `<p>${dados}</p>`;
  }
}
async function lista_cliente() {
  const opt = {
    method: "POST",
    mode: "cors",
    cache: "default",
  };

  const response = await fetch("listacliente.php", opt);
  const html = await response.text();
  console.log(html);
  document.getElementById("dados").innerHTML = html;
}

async function inserir() {
  const form = document.querySelector("#frmcliente");
  const formData = new FormData(form);

  const opt = {
    method: "POST",
    mode: "cors",
    body: formData,
    cache: "default",
  };
  const response = await fetch("cadastro.php", opt);
  const dados = await response.text();
  console.log(dados);
  console.log(dados);
  //VARIFICAMOS SE A RESPOSTA DO PHP OU SERVER É TRUE
  if (dados == "true") {
    //CASO SEJA TRUE, EXIBIMOS A MENSAGEM DE SALVO COM SUCESSO,
    //E ALTERAMOS A COR DO COMPONENTE ALERT PARA SUCCESS
    alerta.className = "alert alert-success";
    titulo.className = "mb-0";
    titulo.innerHTML = `<p>Cadastro realizado com sucesso!`;
    //OCULTA O ICONES CARREGANDO
    carregando.className = "mb-0 d-none";
    lista_cliente();
    //aguardamos 0,5 seg para fechar o modal
    setTimeout(() => {
      //fecha o modal
      $("#cadastrocliente").modal("hide");
      $("#frmcliente input").val("");
      $("#alerta").removeClass("alert alert-success");
      $("#alerta").addClass("alert alert-warning");
      $("#titulo").removeClass("d-none");
      $("#titulo").addClass("mb-0");
      titulo.innerHTML = `
            <h6 class="alert-heading">Atenção!</h6>
            Todos os campos com <span class="text-danger"> * </span> 
            são obrigatórios para o
            cadastro!`;
    }, 1000);
  } else {
    titulo.className = `mb-0`;
    titulo.innerHTML = `<p>${dados}</p>`;
  }
}
//MAPEAMOS O EVENTO DE CARREGAMENTO DO DOCUMENTO
document.addEventListener("DOMContentLoaded", function () {
  lista_cliente();
});

atualiza.addEventListener("click", async function () {
  lista_cliente();
});

cadastro.addEventListener("click", function () {
  document.getElementById("acao").value = "insert";
});

salvar.addEventListener("click", function () {
  //RECEBEMOS O RESULTADO DA VALIDAÇÃO DO FORMULARIO
  const valida = $("#frmcliente").valid();
  // let acao = document.getElementById("edtacao");
  if (valida == true) {
    if (document.getElementById("acao").value == "update") {
      titulo.className = "d-none";
      carregando.className = "mb-0";
      setTimeout(() => {
        update();
      }, 500);
    } else if (document.getElementById("acao").value == "insert") {
      titulo.className = "d-none";
      carregando.className = "mb-0";
      setTimeout(() => {
        inserir();
      }, 500);
    }
    /*alerta.className = 'alert alert-primary';
        titulo.className = 'd-none';
        carregando.className = 'mb-0';
        setTimeout(() => {
            inserir();
        }, 500);*/
  }
});

$("#cpf").inputmask({
  mask: "999.999.999-99",
});

$("#telefone").inputmask({
  mask: "(99)99999-9999",
});
