// Função para adicionar carros à tabela de gestão
function adicionarCarro() {
    // Coletando os valores dos inputs
    const nome = document.getElementById('inputNome').value;
    const marca = document.getElementById('inputMarca').value;
    const modelo = document.getElementById('inputModelo').value;
    const matricula = document.getElementById('inputMatricula').value;
    const cor = document.getElementById('inputCor').value;
    const telemovel = document.getElementById('inputTelemovel').value;
    const email = document.getElementById('inputEmail').value;

    // Criando uma nova linha na tabela de gestão
    const tabelaBody = document.getElementById('tabelaBody');
    const novaLinha = document.createElement('tr');

    // Preenchendo os dados na nova linha
    novaLinha.innerHTML = `
        <td><input type="text" value="${nome}" readonly></td>
        <td><input type="text" value="${marca}" readonly></td>
        <td><input type="text" value="${modelo}" readonly></td>
        <td><input type="text" value="${matricula}" readonly></td>
        <td><input type="text" value="${cor}" readonly></td>
        <td><input type="text" value="${telemovel}" readonly></td>
        <td><input type="email" value="${email}" readonly></td>
        <td>
            <button onclick="editarLinha(this)">Editar</button>
            <button onclick="removerLinha(this)">Remover</button>
            <button onclick="cadastrarCarro(this)">Cadastrar</button>
        </td>
    `;

    tabelaBody.appendChild(novaLinha);

    // Limpa o formulário
    document.getElementById('formCarro').reset();
}

// Função para editar uma linha
function editarLinha(button) {
    const linha = button.parentNode.parentNode;
    const inputs = linha.querySelectorAll('input');
    inputs.forEach(input => input.removeAttribute('readonly'));
    button.textContent = 'Salvar';
    button.setAttribute('onclick', 'salvarLinha(this)');
}

// Função para salvar uma linha editada
function salvarLinha(button) {
    const linha = button.parentNode.parentNode;
    const inputs = linha.querySelectorAll('input');
    inputs.forEach(input => input.setAttribute('readonly', 'true'));
    button.textContent = 'Editar';
    button.setAttribute('onclick', 'editarLinha(this)');
}

// Função para remover uma linha da tabela
function removerLinha(button) {
    const linha = button.parentNode.parentNode;
    linha.remove();
}

// Função para cadastrar um carro e salvá-lo no localStorage
function cadastrarCarro(button) {
    const linha = button.parentNode.parentNode;
    
    // Coleta os dados da linha
    const nome = linha.querySelector('td:nth-child(1) input').value;
    const marca = linha.querySelector('td:nth-child(2) input').value;
    const matricula = linha.querySelector('td:nth-child(4) input').value;
    const cor = linha.querySelector('td:nth-child(5) input').value;

    // Objeto carro com os dados coletados
    const carro = {
        nome,
        marca,
        matricula,
        cor,
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

    alert('Carro cadastrado com sucesso!');
    
    // Remove a linha de cadastro
    linha.remove();
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
                <td><button onclick="eliminarLinha(this)">Eliminar</button></td> <!-- Botão Eliminar -->
            `;
            tbody.appendChild(novaLinha);
        });
    } else {
        tabelaPrincipal.style.display = 'none'; // Oculta a tabela se não houver carros para essa marca
    }
}

// Função para eliminar uma linha da tabela principal
function eliminarLinha(button) {
    const linha = button.parentNode.parentNode;
    linha.remove();

    // Opcional: Atualizar o localStorage após a remoção
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