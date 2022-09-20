//A PRESENTE FUNÇÃO RETORNA UM PROMESSA OU PROMISE
function find(url, opt) {
    return fetch(url, opt);
}
//A PRESENTE FUNÇÃO VALIDA O CPF
function isValidCPF(cpf) {
    if (typeof cpf !== "string") return false
    cpf = cpf.replace(/[\s.-]*/igm, '')
    if (
        !cpf ||
        cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999"
    ) {
        return false
    }
    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11)) resto = 0
    if (resto != parseInt(cpf.substring(9, 10))) return false
    soma = 0
    for (var i = 1; i <= 10; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11)) resto = 0
    if (resto != parseInt(cpf.substring(10, 11))) return false
    return true
}
//A PRESENTE FUNÇÃO VALIDA O CNPJ
function isValidCNPJ(value) {
    if (!value) return false
    // Aceita receber o valor como string, número ou array com todos os dígitos
    const isString = typeof value === 'string'
    const validTypes = isString || Number.isInteger(value) || Array.isArray(value)
    // Elimina valor em formato inválido
    if (!validTypes) return false
    // Filtro inicial para entradas do tipo string
    if (isString) {
        // Limita ao máximo de 18 caracteres, para CNPJ formatado
        if (value.length > 18) return false
        // Teste Regex para veificar se é uma string apenas dígitos válida
        const digitsOnly = /^\d{14}$/.test(value)
        // Teste Regex para verificar se é uma string formatada válida
        const validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(value)
        // Se o formato é válido, usa um truque para seguir o fluxo da validação
        if (digitsOnly || validFormat) true
        // Se não, retorna inválido
        else return false
    }
    // Guarda um array com todos os dígitos do valor
    const match = value.toString().match(/\d/g)
    const numbers = Array.isArray(match) ? match.map(Number) : []
    // Valida a quantidade de dígitos
    if (numbers.length !== 14) return false
    // Elimina inválidos com todos os dígitos iguais
    const items = [...new Set(numbers)]
    if (items.length === 1) return false
    // Cálculo validador
    const calc = (x) => {
        const slice = numbers.slice(0, x)
        let factor = x - 7
        let sum = 0
        for (let i = x; i >= 1; i--) {
            const n = slice[x - i]
            sum += n * factor--
            if (factor < 2) factor = 9
        }
        const result = 11 - (sum % 11)
        return result > 9 ? 0 : result
    }
    // Separa os 2 últimos dígitos de verificadores
    const digits = numbers.slice(12)
    // Valida 1o. dígito verificador
    const digit0 = calc(12)
    if (digit0 !== digits[0]) return false
    // Valida 2o. dígito verificador
    const digit1 = calc(13)
    return digit1 === digits[1]
}
//CONSULTAMOS OS DADOS DA EMPRESA ATRAVÉZ DO CNPJ
async function getCnpj(cnpj) {
    //AQUI TEMOS A CONFIGURAÇÃO DO METODOS DE REQUISIÇÃO
    const options = {
        method: "GET",
        mode: "cors",
        cache: "default",
    }
    const response = await find(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`, options);
    let json = await response.json();
    showData(json);
}
//A PRESENTE FUNÇÃO PREENCHE OS CAMPOS DO FORM
const showData = (result) => {
    for (const campo in result) {
        if (document.querySelector("#" + campo)) {
            //VERIFICAMOS SE O CAMPO SE TRATA DE UMA DATA
            if (campo == "data_inicio_atividade") {
                //CONVERTEMOS A DATA PARA O FORMATO BRASILEIRO
                document.querySelector("#" + campo).value = result[campo].split('-').reverse().join('/');
            } else {
                document.querySelector("#" + campo).value = result[campo];
            }
        }
    }
}
//CONFIGURAÇÕES DOS PARAMENTRO DE VALIDAÇÃO DO FORMULÁRIO
$('#form').validate({
    rules: {
        edtimagems: {
            required: true,
            file: true,
        },
        agree: "required"
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
        error.addClass('invalid-feedback');
        element.closest('.form-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
        $(element).addClass('is-invalid');
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).removeClass('is-invalid');
    }
});
//MAPEAMOS O CAMPO CNPJ 
const cnpj = document.querySelector("#cnpj");
//MAPEAMOS O BOTÃO DE SALVAR
const btn = document.querySelector("#btnsalvar");
//MONITORAMOS O EVENTO DE CLICK DO BOTÃO SALVAR
btn.addEventListener("click", (e) => {
    //RECEBEMOS O RESULTADO DA VALIDAÇÃO DO FORMULARIO
    let valida = $('#form').valid();
    //VERICAMOS SE O FORM ESTA COM OS DADOS VALIDOS
    if (valida == true) {
        alert("Valido!");
    }
});
//EVENTO DE SAIDA DO CAMPO CPF OU CNPJ
cnpj.addEventListener("blur", () => {
    if (cnpj.value.length > 14) {
        //REMOVEMOS OS CARACTES DA MACARA DO CNPJ.
        let documento = cnpj.value.replace(".", "").replace("/", "").replace("-", "");
        if (isValidCNPJ(cnpj.value)) {
            //FAZEMOS UMA BUSCA NA API DE CNPJs COM O DOCUMENTO DIGITADO
            getCnpj(documento);
        } else {
            cnpj.value = '';
            alerta(1, 'CNPJ informado é inválido!', 'Documento inválido!', '');
        }
    } else {
        if (!isValidCPF(cnpj.value)) {
            cnpj.value = '';
            alerta(1, 'CPF informado é inválido!', 'Documento inválido!', '');
        }
    }
});

$(document).ready(function () {
    //ADICIONA A MASCARA DO CFP OU DO CNPJ
    $("#cnpj").inputmask({
        mask: ['999.999.999-99', '99.999.999/9999-99'],
        keepStatic: true
    });
    //ADICIONA A MASCARA DO CFP OU DO CNPJ
    $("#data_inicio_atividade").inputmask({
        mask: ['99/99/9999'],
    });
    //IMPLEMENTAMOS O PLUGIN DE DATA
    $('#data_inicio_atividade').datepicker({
        language: "pt-BR",
        autoclose: true
    });
});