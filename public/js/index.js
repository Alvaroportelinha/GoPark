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