document.getElementById('formPostagem').addEventListener('submit', function (e) {
    e.preventDefault(); 
    criarPostagem();
});


let postagens = [];
let postagemEditandoId = null;


// Criar Postagens

function criarPostagem() {
    const texto = document.getElementById('textoPostagem').value;
    const categoria = document.getElementById('categoriaPostagem').value;
    const imagem1 = document.getElementById('imagem1').value;
    const imagem2 = document.getElementById('imagem2').value;
    const imagem3 = document.getElementById('imagem3').value;

    if (postagemEditandoId !== null) {
        const postagem = postagens.find(p => p.id === postagemEditandoId);
        postagem.texto = texto;
        postagem.categoria = categoria;
        postagem.imagens = [imagem1, imagem2, imagem3].filter(url => url !== "");
        postagemEditandoId = null;
    } else {
        const novaPostagem = {
            id: Date.now(),
            texto: texto,
            categoria: categoria,
            imagens: [imagem1, imagem2, imagem3].filter(url => url !== ""),
            dataHora: new Date().toLocaleString()
        };
        postagens.push(novaPostagem);
    }

    document.getElementById('formPostagem').reset();
    exibirPostagens(postagens);
}

// Exibir postagens

function exibirPostagens(postagens) {
    const container = document.getElementById('postagensContainer');
    container.innerHTML = '';

    postagens.forEach(post => {
        const postagemDiv = document.createElement('div');
        postagemDiv.className = 'postagem';

        const textoPostagem = document.createElement('h3');
        textoPostagem.innerText = post.texto;
        postagemDiv.appendChild(textoPostagem);

        const categoriaPostagem = document.createElement('p');
        categoriaPostagem.innerText = `Categoria: ${post.categoria}`;
        postagemDiv.appendChild(categoriaPostagem);

        const dataHoraPostagem = document.createElement('p');
        dataHoraPostagem.innerText = `Data e Hora: ${post.dataHora}`;
        postagemDiv.appendChild(dataHoraPostagem);

// Carrossel 

        if (post.imagens.length > 0) {
            const carouselDiv = document.createElement('div');
            carouselDiv.className = 'carousel';

            post.imagens.forEach((imgUrl, index) => {
                const img = document.createElement('img');
                img.src = imgUrl;
                if (index === 0) img.className = 'active';
                carouselDiv.appendChild(img);
            });

            const prev = document.createElement('span');
            prev.className = 'nav prev';
            prev.innerHTML = '&#10094;';
            prev.onclick = () => mudarImagem(carouselDiv, -1);
            carouselDiv.appendChild(prev);

            const next = document.createElement('span');
            next.className = 'nav next';
            next.innerHTML = '&#10095;';
            next.onclick = () => mudarImagem(carouselDiv, 1);
            carouselDiv.appendChild(next);

            postagemDiv.appendChild(carouselDiv);
        }

// Botões editar e Apagar

        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'buttons';

        const editarButton = document.createElement('button');
        editarButton.className = 'editar';
        editarButton.innerText = 'Editar';
        editarButton.onclick = () => editarPostagem(post.id);
        buttonsDiv.appendChild(editarButton);

        const apagarButton = document.createElement('button');
        apagarButton.className = 'apagar';
        apagarButton.innerText = 'Apagar';
        apagarButton.onclick = () => apagarPostagem(post.id);
        buttonsDiv.appendChild(apagarButton);

        postagemDiv.appendChild(buttonsDiv);
        container.appendChild(postagemDiv);
    });

// Mudar a Imagem do Carrossel

    function mudarImagem(carousel, direcao) {
        const imagens = carousel.querySelectorAll('img');
        let indiceAtivo = Array.from(imagens).findIndex(img => img.classList.contains('active'));
        imagens[indiceAtivo].classList.remove('active');
        indiceAtivo = (indiceAtivo + direcao + imagens.length) % imagens.length;
        imagens[indiceAtivo].classList.add('active');
    }
}

// Editar Post

function editarPostagem(id) {
    const postagem = postagens.find(p => p.id === id);
    document.getElementById('textoPostagem').value = postagem.texto;
    document.getElementById('categoriaPostagem').value = postagem.categoria;
    document.getElementById('imagem1').value = postagem.imagens[0] || '';
    document.getElementById('imagem2').value = postagem.imagens[1] || '';
    document.getElementById('imagem3').value = postagem.imagens[2] || '';
    postagemEditandoId = id;
}

// Apagar Post

function apagarPostagem(id) {
    if (confirm('Tem certeza que deseja apagar esta postagem?')) {
        postagens = postagens.filter(p => p.id !== id);
        exibirPostagens(postagens);
    }
}

// Filtrar as postagens por categoria

function filtrarPostagens() {
    const categoriaFiltro = document.getElementById('filtroCategoria').value;
    if (categoriaFiltro === 'Todos') {
        exibirPostagens(postagens);
    } else {
        const postagensFiltradas = postagens.filter(p => p.categoria === categoriaFiltro);
        exibirPostagens(postagensFiltradas);
    }
}
