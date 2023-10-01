var ul = document.querySelector('nav ul');
var menuBtn = document.querySelector('.menu-btn i');

function menuShow() {
    if (ul.classList.contains('open')) {
        ul.classList.remove('open');
    }else{
        ul.classList.add('open');
    }
}




// Cria uma função chamada TxtType que recebe três parâmetros: el, toRotate e period
var TxtType = function(el, toRotate, period) {
    // Armazena o valor do parâmetro toRotate em uma variável chamada this.toRotate
    this.toRotate = toRotate;
    // Armazena o valor do parâmetro el em uma variável chamada this.el
    this.el = el;
    // Cria uma variável chamada this.loopNum e inicializa com o valor 0
    this.loopNum = 0;
    // Converte o valor do parâmetro period para um número inteiro e armazena em uma variável chamada this.period. Se o valor de period não puder ser convertido para um número inteiro, a variável this.period receberá o valor padrão de 2000.
    this.period = parseInt(period, 10) || 2000;
    // Cria uma variável chamada this.txt e inicializa com uma string vazia
    this.txt = '';
    // Chama a função tick pela primeira vez
    this.tick();
    // Cria uma variável chamada this.isDeleting e inicializa com o valor falso
    this.isDeleting = false;
};

// Define a função tick
TxtType.prototype.tick = function() {
    // Cria a variável i e recebe o valor do resto da divisão entre o valor de this.loopNum e o comprimento da lista de palavras armazenada em this.toRotate
    var i = this.loopNum % this.toRotate.length;
    // Cria a variável fullTxt e recebe o valor da palavra na posição i da lista de palavras armazenada em this.toRotate
    var fullTxt = this.toRotate[i];

    // Verifica se a variável this.isDeleting é verdadeira ou falsa
    if (this.isDeleting) {
        // Se for verdadeira, a variável this.txt recebe o valor da substring de fullTxt que começa no índice 0 e termina no índice igual ao comprimento da string armazenada em this.txt menos 1
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        // Se for falsa, a variável this.txt recebe o valor da substring de fullTxt que começa no índice 0 e termina no índice igual ao comprimento da string armazenada em this.txt mais 1
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Atualiza o conteúdo HTML do elemento armazenado em this.el com uma nova string que contém um elemento span com classe "wrap" e o texto armazenado na variável this.txt
    this.el.innerHTML = '<span class="typewrite-wrap">'+this.txt+'</span>';

    // Cria a variável that e recebe o valor de this
    var that = this;
    // Cria a variável delta e recebe o valor de 200 menos um número aleatório entre 0 e 100
    var delta = 200 - Math.random() * 100;

    // Verifica se a variável this.isDeleting é verdadeira ou falsa
    if (this.isDeleting) { 
        // Se for verdadeira, o valor da variável delta é dividido por 2
        delta /= 2; 
    }

    // Verifica duas condições
    if (!this.isDeleting && this.txt === fullTxt) {
        // Se a primeira condição for verdadeira, o valor da variável delta é atualizado com o valor armazenado na variável this.period e o valor da variável this.isDeleting é atualizado com o valor verdadeiro
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        // Se a segunda condição for verdadeira, o valor da variável this.isDeleting é atualizado com o valor falso, o valor da variável loopNum é incrementado em 1 e o valor da variável delta é atualizado com o valor 500.
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    // Chama a função tick novamente após um intervalo de tempo igual ao valor armazenado na variável delta.
    setTimeout(function() {
        that.tick();
    }, delta);
};

// Quando a página é carregada, esta função é executada
window.onload = function() {
    // Seleciona todos os elementos com classe 'typewrite' e armazena em uma variável chamada elements.
    var elements = document.getElementsByClassName('typewrite');
    // Percorre cada elemento da lista elements
    for (var i=0; i<elements.length; i++) {
        // Obtém o valor do atributo 'data-type' do elemento na posição i da lista elements e armazena em uma variável chamada toRotate
        var toRotate = elements[i].getAttribute('data-type');
        // Obtém o valor do atributo 'data-period' do elemento na posição i da lista elements e armazena em uma variável chamada period
        var period = elements[i].getAttribute('data-period');
        // Verifica se o valor de toRotate é verdadeiro
        if (toRotate) {
          // Se for verdadeiro, cria um novo objeto TxtType passando como parâmetros o elemento na posição i da lista elements, o valor de toRotate convertido para um objeto JSON e o valor de period.
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
}




