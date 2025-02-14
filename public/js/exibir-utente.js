
// Função para exibir todos os utentes do localStorage
function exibirUtentes() {
    const tabelaUtentesBody = document.getElementById('tabelaUtentesBody');
    tabelaUtentesBody.innerHTML = ''; // Limpa a tabela antes de preencher

    // Obtém os carros cadastrados do localStorage
    const carrosCadastrados = JSON.parse(localStorage.getItem('carrosPorMarca')) || {};

    // Array para armazenar todos os carros de todas as marcas
    let todosOsCarros = [];

    // Percorre cada marca e seus carros, adicionando-os ao array
    for (const marca in carrosCadastrados) {
        carrosCadastrados[marca].forEach(carro => {
            todosOsCarros.push({
                ...carro, // Copia as propriedades do carro
                marcaOriginal: marca // Adiciona a marca original
            });
        });
    }

    // Ordena o array com base no nome do carro (utente) em ordem ascendente
    todosOsCarros.sort((a, b) => a.nome.localeCompare(b.nome));

    // Preenche a tabela com os carros (utentes) ordenados
    todosOsCarros.forEach((carro, index) => {
        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
            <td>${carro.nome}</td>
            <td>${carro.marca}</td>
            <td>${carro.modelo || '-'}</td>
            <td>${carro.matricula}</td>
            <td>${carro.cor}</td>
            <td>${carro.telemovel || '-'}</td>
            <td>${carro.email || '-'}</td>
           
                <button class="btn-eliminar" data-marca="${carro.marcaOriginal}" data-matricula="${carro.matricula}">Eliminar</button>
            </td>
        `;
        tabelaUtentesBody.appendChild(novaLinha);
    });

    // Exibe um alerta caso não haja utentes cadastrados
    if (todosOsCarros.length === 0) {
        alert('Nenhum utente encontrado no localStorage.');
    }

    // Adiciona event listeners para os botões de eliminar
    const botoesEliminar = document.querySelectorAll('.btn-eliminar');
    botoesEliminar.forEach(botao => {
        botao.addEventListener('click', function() {
            const marca = this.getAttribute('data-marca');
            const matricula = this.getAttribute('data-matricula');
            eliminarUtente(marca, matricula);
        });
    });
}

// Função para eliminar um utente com base na marca e matrícula
function eliminarUtente(marca, matricula) {
    const carrosCadastrados = JSON.parse(localStorage.getItem('carrosPorMarca')) || {};

    // Encontra o carro correto com base na matrícula e remove-o
    if (carrosCadastrados[marca]) {
        carrosCadastrados[marca] = carrosCadastrados[marca].filter(carro => carro.matricula !== matricula);

        // Se a marca não tiver mais carros, pode remover a marca do localStorage
        if (carrosCadastrados[marca].length === 0) {
            delete carrosCadastrados[marca];
        }

        // Atualiza o localStorage
        localStorage.setItem('carrosPorMarca', JSON.stringify(carrosCadastrados));

        // Atualiza a tabela após eliminar
        exibirUtentes();
    }
}
// Função para pesquisar utentes por nome ou matrícula
function pesquisarUtente() {
    const input = document.getElementById('pesquisarInput').value.toLowerCase();
    const linhas = document.querySelectorAll('#tabelaUtentesBody tr');
    
    linhas.forEach(linha => {
        const nome = linha.querySelector('td:nth-child(1)').textContent.toLowerCase();
        const matricula = linha.querySelector('td:nth-child(4)').textContent.toLowerCase();

        // Verifica se o nome ou a matrícula correspondem ao que foi digitado
        if (nome.includes(input) || matricula.includes(input)) {
            linha.style.display = ''; // Exibe a linha
        } else {
            linha.style.display = 'none'; // Oculta a linha
        }
    });
}