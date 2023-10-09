let listaNumerosGerados = [];
let numeroMax = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 0;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}


function exibirMensagemInicial() {
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela("p", `Escolha um número entre 1 e ${numeroMax}`);
}

function verificarChute() {
    let numeroDigitado = document.querySelector("input").value;
    tentativas++;
    if (numeroDigitado == numeroSecreto) {
        exibirTextoNaTela("h1", "Acertou!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}.`;
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
        document.getElementById("botaoChute").setAttribute("disabled", true);
    }else {
        if (numeroDigitado > numeroSecreto) {
            exibirTextoNaTela("p", "O número secreto é menor.");
        }else {
            exibirTextoNaTela("p", "O número secreto é maior. ");
        }
        limparCampoDigitado();
    }
}

function gerarNumeroAleatorio() {
    let numeroGerado = parseInt(Math.random() * numeroMax + 1);
    let quantidadeNumerosGerados = listaNumerosGerados.length;

    if (quantidadeNumerosGerados == numeroMax) {
        listaNumerosGerados = [];
    }

    if (listaNumerosGerados.includes(numeroGerado)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumerosGerados.push(numeroGerado);
        console.log(listaNumerosGerados);
        return numeroGerado;
    }
}

function limparCampoDigitado() {
    numeroDigitado = document.querySelector("input");
    numeroDigitado.value = "";
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampoDigitado();
    tentativas = 0;
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela("p", "Escolha um número entre 1 e 100");
    document.getElementById("botaoChute").removeAttribute("disabled");
    document.getElementById("reiniciar").setAttribute("disabled", true);
}

exibirMensagemInicial();