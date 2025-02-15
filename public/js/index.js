// Adiciona evento de clique nos ícones de marcas
const marcas = document.querySelectorAll('.brand-icon');
marcas.forEach(marca => {
    marca.addEventListener('click', function() {
        const marcaSelecionada = this.getAttribute('data-brand');
        exibirCarrosPorMarca(marcaSelecionada);
    });
});

function exibirCarrosPorMarca(marca) {
    const tabelaPrincipal = document.getElementById('tabelaPrincipal');
    const tbody = tabelaPrincipal.querySelector('tbody');
    tbody.innerHTML = ''; // Limpa os carros anteriores

    const carrosCadastrados = JSON.parse(localStorage.getItem('carrosPorMarca')) || {};

    if (carrosCadastrados[marca] && carrosCadastrados[marca].length > 0) {
        // Ordenar os carros por matrícula (de forma ascendente)
        const carrosOrdenados = carrosCadastrados[marca].sort((a, b) => a.matricula.localeCompare(b.matricula));

        tabelaPrincipal.style.display = 'table'; // Exibe a tabela

        carrosOrdenados.forEach(carro => {
            // Primeira linha: Nome, Marca, Matrícula, Cor
            const linhaInfo = document.createElement('tr');
            linhaInfo.innerHTML = `
                <td>${carro.nome}</td>
                <td>${carro.marca}</td>
                <td>${carro.matricula}</td>
                <td>${carro.cor}</td>
            `;

            // Segunda linha: Entrada
            const linhaEntrada = document.createElement('tr');
            linhaEntrada.innerHTML = `
                <td colspan="4">
                    <button onclick="setDataHoraEntrada(this)">Entrou</button>
                    <input type="datetime-local" class="dataHoraEntradaInput">
                </td>
            `;

            // Terceira linha: Saída
            const linhaSaida = document.createElement('tr');
            linhaSaida.innerHTML = `
                <td colspan="4">
                    <button onclick="setDataHoraSaida(this)">Saiu</button>
                    <input type="datetime-local" class="dataHoraSaidaInput">
                </td>
            `;

            // Quarta linha: Registrar
            const linhaRegistrar = document.createElement('tr');
            linhaRegistrar.innerHTML = `
                <td colspan="4">
                    <button onclick="registrar(this)">Registrar</button>
                </td>
            `;

            // Adiciona todas as linhas ao tbody
            tbody.appendChild(linhaInfo);
            tbody.appendChild(linhaEntrada);
            tbody.appendChild(linhaSaida);
            tbody.appendChild(linhaRegistrar);
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
    let linhaRegistrar = button.closest('tr'); // Linha do botão Registrar
    let linhaSaida = linhaRegistrar.previousElementSibling; // Linha de saída
    let linhaEntrada = linhaSaida.previousElementSibling; // Linha de entrada
    let linhaInfo = linhaEntrada.previousElementSibling; // Linha de informações do carro

    // Coleta os dados do carro
    const nome = linhaInfo.querySelector('td:nth-child(1)').textContent;
    const marca = linhaInfo.querySelector('td:nth-child(2)').textContent;
    const matricula = linhaInfo.querySelector('td:nth-child(3)').textContent;
    const cor = linhaInfo.querySelector('td:nth-child(4)').textContent;

    // Captura os valores de entrada e saída
    const horaEntrada = linhaEntrada.querySelector('.dataHoraEntradaInput').value;
    const horaSaida = linhaSaida.querySelector('.dataHoraSaidaInput').value;

    // Objeto de registro
    const registro = {
        nome,
        marca,
        matricula,
        cor,
        horaEntrada,
        horaSaida
    };

    // Armazena no localStorage
    let registros = JSON.parse(localStorage.getItem('tabelaRegistros')) || [];
    registros.push(registro);
    localStorage.setItem('tabelaRegistros', JSON.stringify(registros));

    alert('Registro salvo com sucesso!');

    // Remove todas as linhas relacionadas ao carro registrado
    linhaInfo.remove();
    linhaEntrada.remove();
    linhaSaida.remove();
    linhaRegistrar.remove();
}
