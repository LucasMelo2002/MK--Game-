// Variáveis para armazenar a altura, largura, vidas e tempo do jogo
var altura = 0;
var largura = 0;
var vidas = 1;
var tempo = 15;

// Variável que determina o intervalo de criação de mosquitos
var criaMosquitoTempo = 1500;

// Obtém o nível do jogo a partir da URL
var nivel = window.location.search;
nivel = nivel.replace('?', '');

// Define o intervalo de criação de mosquitos com base no nível
if (nivel === 'normal') {
    // Nível normal: 1500 milissegundos
    criaMosquitoTempo = 1500;
} else if (nivel === 'dificil') {
    // Nível difícil: 1000 milissegundos
    criaMosquitoTempo = 1000;
} else if (nivel === 'chucknorris') {
    // Nível Chuck Norris: 750 milissegundos
    criaMosquitoTempo = 750;
}

// Função para ajustar o tamanho do palco do jogo com base na janela
function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight;
    largura = window.innerWidth;

    console.log(largura, altura);
}

// Chama a função para ajustar o tamanho do palco do jogo
ajustaTamanhoPalcoJogo();

// Configura o cronômetro do jogo
var cronometro = setInterval(function () {
    tempo -= 1;

    if (tempo < 0) {
        // Encerra o jogo quando o tempo acabar
        clearInterval(cronometro);
        clearInterval(criaMosca);
        window.location.href = 'vitoria.html';
    } else {
        // Atualiza o elemento HTML exibindo o cronômetro
        document.getElementById('cronometro').innerHTML = tempo;
    }

}, 1000);

// Função para posicionar aleatoriamente o mosquito na tela
function posicaoRandomica() {
    // Remove o mosquito anterior, se existir
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove();

        if (vidas > 3) {
            // Redireciona para a página de fim de jogo quando o jogador perde todas as vidas
            window.location.href = 'fim_de_jogo.html';
        } else {
            // Atualiza a representação gráfica das vidas restantes
            document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png";
            vidas++;
        }
    }

    // Gera posições X e Y aleatórias para o mosquito
    var posicaoX = Math.floor(Math.random() * largura) - 90;
    var posicaoY = Math.floor(Math.random() * altura) - 90;

    // Garante que as posições não sejam negativas
    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;

    console.log(posicaoX, posicaoY);

    // Cria o elemento HTML para o mosquito
    var mosquito = document.createElement('img');
    mosquito.src = 'imagens/mosquito.png';
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio();
    mosquito.style.left = posicaoX + 'px';
    mosquito.style.top = posicaoY + 'px';
    mosquito.style.position = 'absolute';
    mosquito.id = 'mosquito';
    mosquito.onclick = function () {
        // Remove o mosquito ao clicar sobre ele
        this.remove();
    }

    // Adiciona o mosquito ao corpo da página
    document.body.appendChild(mosquito);
}

// Função que retorna uma classe de tamanho aleatório para o mosquito
function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3);

    switch (classe) {
        case 0:
            return 'mosquito1';

        case 1:
            return 'mosquito2';

        case 2:
            return 'mosquito3';
    }
}

// Função que retorna uma classe de lado aleatório para o mosquito
function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2);

    switch (classe) {
        case 0:
            return 'ladoA';

        case 1:
            return 'ladoB';
    }
}
