let total = 0;
let pedidos = [];


function adicionarPedido(nome, preco) {
    pedidos.push({ nome, preco });
    total += preco;

    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById("lista-pedidos");
    const totalElemento = document.getElementById("total");

    lista.innerHTML = "";

    pedidos.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = '${item.nome} - R$ ${item.preco.toFixed(2)}';
        lista.appendChild(li);
    });

    totalElemento.textContent = total.toFixed(2).replace(".", ",")
}

function finalizarPedido() {
    if (pedidos.length === 0) {
        alert("Adicione algum item ao pedido primeiro");
        return;
    }

    let mensagem = "Olá! Gostaria de fazer o seguinte pedido:%0A";


    pedidos.forEach((item) => {
        mensagem += '- ${item.nome} - R$ ${item.preco.toFixed(2)}%0A';
    });

    mensagem += '%0ATotal: R$ ${total.toFixed(2)}';

    window.open('https://wa.me/5511999999999?text=${mensagem}', "_blank");
}

function falarTexto(texto) {
    // Verifica se o navegador suporta síntese de voz
    if ('speechSynthesis' in window) {
        const mensagem = new SpeechSynthesisUtterance(texto);
        mensagem.lang = 'pt-BR'; // Define o idioma para português do Brasil
        mensagem.rate = 1.0;     // Velocidade da fala
        window.speechSynthesis.speak(mensagem);
    } else {
        alert("Seu navegador não suporta leitura em voz alta.");
    }
}
function falarTexto(texto) {
    if ('speechSynthesis' in window) {
        // Cancela qualquer fala em andamento antes de iniciar uma nova
        window.speechSynthesis.cancel();

        const mensagem = new SpeechSynthesisUtterance(texto);
        mensagem.lang = 'pt-BR';
        mensagem.rate = 1.0;
        window.speechSynthesis.speak(mensagem);
    } else {
        alert("Seu navegador não suporta leitura em voz alta.");
    }
}

// Função que pega o título e a descrição do card clicado
function falarCard(botao) {
    const card = botao.closest('.card');
    const titulo = card.querySelector('h3').innerText;
    const descricao = card.querySelector('p').innerText;
    
    falarTexto(`${titulo}. ${descricao}`);
}

// Função para ler o título e o parágrafo de qualquer seção do site
function falarSecao(botao) {
    const secao = botao.closest('section');
    const titulo = secao.querySelector('h2') ? secao.querySelector('h2').innerText : '';
    const texto = secao.querySelector('p').innerText;
    
    falarTexto(`${titulo}. ${texto}`);
}

// Função para ler a descrição da imagem (atributo alt)
function falarImagem(botao) {
    const card = botao.closest('.foto-card');
    const imagem = card.querySelector('img');
    const descricao = imagem.getAttribute('alt');
    
    falarTexto(descricao);
}