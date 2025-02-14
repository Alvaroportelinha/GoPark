
function adicionarCarro() {
    // Coletando os valores dos inputs
    const nome = document.getElementById('inputNome').value;
    const marca = document.getElementById('inputMarca').value;
    const modelo = document.getElementById('inputModelo').value;
    const matricula = document.getElementById('inputMatricula').value;
    const cor = document.getElementById('inputCor').value;
    const telemovel = document.getElementById('inputTelemovel').value;
    const email = document.getElementById('inputEmail').value;

    // Criando um objeto carro
    const carro = {
        nome,
        marca,
        modelo,
        matricula,
        cor,
        telemovel,
        email,
        entrada: null,
        saida: null
    };

    // Armazenar o carro em localStorage por marca
    let carrosCadastrados = JSON.parse(localStorage.getItem('carrosPorMarca')) || {};
    if (!carrosCadastrados[marca]) {
        carrosCadastrados[marca] = [];
    }
    carrosCadastrados[marca].push(carro);
    localStorage.setItem('carrosPorMarca', JSON.stringify(carrosCadastrados));

    // Adicionando o carro na tabela
    const tabelaBody = document.getElementById('tabelaBody');
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
        <td>${nome}</td>
        <td>${marca}</td>
        <td>${modelo}</td>
        <td>${matricula}</td>
        <td>${cor}</td>
        <td>${telemovel}</td>
        <td>${email}</td>
    `;
    tabelaBody.appendChild(novaLinha);

    alert('Carro cadastrado com sucesso!');
    
    // Limpa o formulário
    document.getElementById('formCarro').reset();
}


// Adiciona evento de clique nos ícones de marcas
const marcas = document.querySelectorAll('.brand-icon');
marcas.forEach(marca => {
    marca.addEventListener('click', function() {
        const marcaSelecionada = this.getAttribute('data-brand');
        exibirCarrosPorMarca(marcaSelecionada);
    });
});

// Função para exibir carros por marca, com ordenação por matrícula
function exibirCarrosPorMarca(marca) {
    const tabelaPrincipal = document.getElementById('tabelaPrincipal');
    const tbody = tabelaPrincipal.querySelector('tbody');
    tbody.innerHTML = ''; // Limpa os carros anteriores

    const carrosCadastrados = JSON.parse(localStorage.getItem('carrosPorMarca')) || {};

    if (carrosCadastrados[marca] && carrosCadastrados[marca].length > 0) {
        // Ordenar os carros por matrícula (de forma ascendente)
        const carrosOrdenados = carrosCadastrados[marca].sort((a, b) => {
            if (a.matricula < b.matricula) {
                return -1;
            } else if (a.matricula > b.matricula) {
                return 1;
            } else {
                return 0;
            }
        });

        tabelaPrincipal.style.display = 'table'; // Exibe a tabela

        carrosOrdenados.forEach(carro => {
            const novaLinha = document.createElement('tr');
            novaLinha.innerHTML = `
                <td>${carro.nome}</td>
                <td>${carro.marca}</td>
                <td>${carro.matricula}</td>
                <td>${carro.cor}</td>
                <td>
                    <button onclick="setDataHoraEntrada(this)">Entrou</button>
                    <input type="datetime-local" id="dataHoraEntradaInput">
                </td>
                <td>
                    <button onclick="setDataHoraSaida(this)">Saiu</button>
                    <input type="datetime-local" id="dataHoraSaidaInput">
                </td>
                <td><button onclick="registrar(this)">Registrar</button></td>
               
            `;
            tbody.appendChild(novaLinha);
        });
    } else {
        tabelaPrincipal.style.display = 'none'; // Oculta a tabela se não houver carros para essa marca
    }
}


// Função para formatar a data e hora local
function formatLocalDateTime(date) {
    const tzOffset = date.getTimezoneOffset() * 60000; // Converte o offset do timezone para milissegundos
    const localTime = new Date(date - tzOffset); // Ajusta o horário UTC para o horário local
    return localTime.toISOString().slice(0, 16); // Retorna no formato 'YYYY-MM-DDTHH:mm'
}

// Funções para registrar entrada e saída
function setDataHoraEntrada(button) {
    const input = button.nextElementSibling;
    input.value = formatLocalDateTime(new Date()); // Define a hora local atual no campo
}

function setDataHoraSaida(button) {
    const input = button.nextElementSibling;
    input.value = formatLocalDateTime(new Date()); // Define a hora local atual no campo
}

function registrar(button) {
    const linha = button.parentNode.parentNode;
    
    // Coleta os dados da linha
    const nome = linha.querySelector('td:nth-child(1)').textContent;
    const marca = linha.querySelector('td:nth-child(2)').textContent;
    const matricula = linha.querySelector('td:nth-child(3)').textContent;
    const cor = linha.querySelector('td:nth-child(4)').textContent;
    const horaEntrada = linha.querySelector('input[id="dataHoraEntradaInput"]').value;
    const horaSaida = linha.querySelector('input[id="dataHoraSaidaInput"]').value;
    
    // Objeto de registro
    const registro = {
        nome,
        marca,
        matricula,
        cor,
        horaEntrada,
        horaSaida
    };
    
    // Armazenar o registro em localStorage
    let registros = JSON.parse(localStorage.getItem('tabelaRegistros')) || [];
    registros.push(registro);
    localStorage.setItem('tabelaRegistros', JSON.stringify(registros));
    
    alert('Registro salvo com sucesso!');
    
    // Remove a linha de cadastro
    linha.remove();
}

function eliminarLinha(button) {
    const linha = button.parentNode.parentNode; // Encontra a linha (tr) a ser removida
    const marca = linha.querySelector('td:nth-child(2)').textContent; // Obtém a marca do carro
    const matricula = linha.querySelector('td:nth-child(3)').textContent; // Obtém a matrícula do carro

    // Remover a linha da tabela
    linha.remove();

    // Atualizar o localStorage após a remoção
    let carrosCadastrados = JSON.parse(localStorage.getItem('carrosPorMarca')) || {};

    if (carrosCadastrados[marca]) {
        // Filtrar os carros removendo o carro com a matrícula correspondente
        carrosCadastrados[marca] = carrosCadastrados[marca].filter(carro => carro.matricula !== matricula);

        // Se não houver mais carros para essa marca, remover a marca do localStorage
        if (carrosCadastrados[marca].length === 0) {
            delete carrosCadastrados[marca];
        }

        // Atualizar o localStorage com os carros restantes
        localStorage.setItem('carrosPorMarca', JSON.stringify(carrosCadastrados));
    }

    alert('Carro removido com sucesso!');
}
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