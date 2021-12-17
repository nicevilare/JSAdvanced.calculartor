// Seleciona o Display
const display = document.querySelector(".display");

// Seleciona as teclas com números
const teclasNumeros = document.querySelectorAll("[id*=tecla]");

// Seleciona os operadores
const operadores = document.querySelectorAll("[id*=operador]");

let novoNumero = true;
let operador;
let numeroAnterior;

const atualizarDisplay = (texto) => {
    if(novoNumero === true){
        display.textContent = texto;
        novoNumero = false;
    } else {
        display.textContent += texto; 
        // juntar texto digitado, concatenar
    }
};

const inserirNumero = (event) => atualizarDisplay(event.target.textContent);

// Função para as teclas com números
teclasNumeros.forEach(function(tecla){
    tecla.addEventListener("click", inserirNumero);
});

const selecionarOperador = (event) => {
    novoNumero = true;
    operador = event.target.textContent;
    numeroAnterior = display.textContent.replace("," , ".");
};

// Função para os operadores
operadores.forEach((operador) => {
    operador.addEventListener("click", selecionarOperador);
});

const calcular = () => {
    //verificamos se há um operador em memória
    if(operador !== undefined){
        //pega o número do display e coloca em numeroAtual
        const numeroAtual = display.textContent.replace("," , ".");
        //seta noNumero como verdadeiro,
        //para que possamos atualizar o display com o resultado
        novoNumero = true;
        //calculamos o resultado com a função eval
        //o eval interpreta uma expressão, executa e retorna o resultado
        const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
        //atualizamos o display com o resultado calculado
        atualizarDisplay(resultado.toString().replace(".",","));
        //resetamos o operador como indefinido (estado inicial)
        operador = undefined;
    }
};

const ativarIgual = () => calcular();

document.querySelector("#igual").addEventListener("click", ativarIgual);

const limparDisplay = () => (display.textContent = "");

document
    .querySelector("#limparDisplay")
    .addEventListener("click", limparDisplay);

const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
};

document
    .querySelector("#limparCalculo")
    .addEventListener("click", limparCalculo);

// Apagar número
// É uma boa prática sempre usar a função de abstração para fazer algo no sistema
const removerUltimoNumero = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent.slice(0, -1));
    // display.textContent = display.textContent.slice(0, -1);
}

document
    .querySelector("#backspace")
    .addEventListener("click", removerUltimoNumero);

// criar a função que atualiza o display invertendo o sinal (*-1)
const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1);
};

// atribuir a função criada ao botão de inversão
document.querySelector("#inverter").addEventListener("click", inverterSinal);

// Colocar vírgula
const inserirDecimal = () => {
    if(!display.textContent.includes(",")){
        if(display.textContent.length > 0) {
            atualizarDisplay(",");
        } else {
            atualizarDisplay("0,");
        }
    }
}

document.querySelector("#decimal").addEventListener("click", inserirDecimal);

// arrowfunction: =>, util para declarar funções anonimas
// function e const