const marcas = document.querySelectorAll('.brand-icon');

marcas.forEach(marca => {
    marca.addEventListener('click', function () {
        const marcaSelecionada = this.getAttribute('data-brand');
        exibirCarrosPorMarca(marcaSelecionada);

        // Faz a página rolar suavemente para a seção dos carros
        setTimeout(() => {
            document.getElementById("carrosContainer").scrollIntoView({ behavior: "smooth" });
        }, 200);
    });
});

function exibirCarrosPorMarca(marca) {
    const container = document.getElementById('carrosContainer');
    
    if (!container) {
        console.error("Elemento 'carrosContainer' não foi encontrado!");
        return;
    }

    container.innerHTML = ''; // Limpa os carros anteriores

    // Recupera os utentes do localStorage
    const utentes = JSON.parse(localStorage.getItem("utentes")) || [];

    // Filtra os carros da marca escolhida
    let carrosFiltrados = utentes.flatMap(utente => 
        (utente.carros || []).filter(carro => carro.marca.toLowerCase() === marca.toLowerCase())
    ).map(carro => ({ ...carro, nome: utentes.find(u => u.carros.includes(carro))?.nome || 'Desconhecido' }));

    if (carrosFiltrados.length === 0) {
        console.warn(`Nenhum carro encontrado para a marca: ${marca}`);
        return;
    }

    // Ordena os carros pela matrícula
    carrosFiltrados.sort((a, b) => a.matricula.localeCompare(b.matricula));

    // Exibe os carros na interface
    carrosFiltrados.forEach(carro => {
        const card = document.createElement('div');
        card.classList.add('carro-card');

        card.innerHTML = `
            <h3>${carro.nome}</h3>
            <p><strong>Marca:</strong> ${carro.marca}</p>
            <p><strong>Matrícula:</strong> ${carro.matricula}</p>
            <p><strong>Cor:</strong> ${carro.cor}</p>
            <div class="actions">
                <button onclick="setDataHoraEntrada(this)">Entrou</button>
                <input type="datetime-local" class="dataHoraEntradaInput">
            </div>
            <div class="actions">
                <button onclick="setDataHoraSaida(this)">Saiu</button>
                <input type="datetime-local" class="dataHoraSaidaInput">
            </div>
            <button class="registrar-btn" onclick="registrar(this)">Registrar</button>
        `;

        container.appendChild(card);
    });
}

// Define a data e hora de entrada
function setDataHoraEntrada(botao) {
    const input = botao.nextElementSibling;
    if (input) input.value = new Date().toISOString().slice(0, 16);
}

// Define a data e hora de saída
function setDataHoraSaida(botao) {
    const input = botao.nextElementSibling;
    if (input) input.value = new Date().toISOString().slice(0, 16);
}

// Função para registrar os dados
function registrar(botao) {
    const card = botao.parentElement;
    const nome = card.querySelector("h3").textContent;
    const marca = card.querySelector("p:nth-child(2)").textContent.replace("Marca: ", "");
    const matricula = card.querySelector("p:nth-child(3)").textContent.replace("Matrícula: ", "");
    const cor = card.querySelector("p:nth-child(4)").textContent.replace("Cor: ", "");
    const entrada = card.querySelector(".dataHoraEntradaInput").value;
    const saida = card.querySelector(".dataHoraSaidaInput").value;

    const registro = {
        nome, marca, matricula, cor, entrada, saida
    };

    // Salvar no localStorage (ou enviar para o backend se necessário)
    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    registros.push(registro);
    localStorage.setItem("registros", JSON.stringify(registros));

    alert("Registro salvo com sucesso!");
}


function exibirCarrosPorMarca(marca) {
    const container = document.getElementById('carrosContainer');
    container.innerHTML = ''; // Limpa os cards anteriores

    // Recupera os utentes do localStorage
    const utentes = JSON.parse(localStorage.getItem("utentes")) || [];

    // Filtra os carros de todos os utentes que correspondem à marca (comparação case-insensitive)
    let carrosFiltrados = [];
    utentes.forEach(utente => {
        utente.carros.forEach(carro => {
            if (String(carro.marca).toLowerCase() === String(marca).toLowerCase()) {
                carro.nome = utente.nome;
                carrosFiltrados.push(carro);
            }
        });
    });

    if (carrosFiltrados.length > 0) {
        carrosFiltrados.sort((a, b) => a.matricula.localeCompare(b.matricula));

        carrosFiltrados.forEach(carro => {
            const card = document.createElement('div');
            card.classList.add('carro-card');

            card.innerHTML = `
                <h3>${carro.nome}</h3>
                <p><strong>Marca:</strong> ${carro.marca}</p>
                <p><strong>Matrícula:</strong> ${carro.matricula}</p>
                <p><strong>Cor:</strong> ${carro.cor}</p>
                <div class="actions">
                    <button onclick="setDataHoraEntrada(this)">Entrou</button>
                    <input type="datetime-local" class="dataHoraEntradaInput">
                </div>
                <div class="actions">
                    <button onclick="setDataHoraSaida(this)">Saiu</button>
                    <input type="datetime-local" class="dataHoraSaidaInput">
                </div>
                <button class="registrar-btn" onclick="registrar(this)">Registrar</button>
            `;

            container.appendChild(card);
        });
    }
}

// Função para formatar a data e hora local
function formatLocalDateTime(date) {
    const tzOffset = date.getTimezoneOffset() * 60000;
    const localTime = new Date(date - tzOffset);
    return localTime.toISOString().slice(0, 16);
}

// Funções para registrar entrada e saída
function setDataHoraEntrada(button) {
    const input = button.nextElementSibling;
    input.value = formatLocalDateTime(new Date());
}

function setDataHoraSaida(button) {
    const input = button.nextElementSibling;
    input.value = formatLocalDateTime(new Date());
}

function registrar(button) {
    const card = button.closest('.carro-card');

    // Coleta os dados do carro
    const nome = card.querySelector('h3').textContent;
    const marca = card.querySelector('p:nth-child(2)').textContent.replace("Marca: ", "");
    const matricula = card.querySelector('p:nth-child(3)').textContent.replace("Matrícula: ", "");
    const cor = card.querySelector('p:nth-child(4)').textContent.replace("Cor: ", "");

    // Captura os valores de entrada e saída
    const horaEntrada = card.querySelector('.dataHoraEntradaInput').value;
    const horaSaida = card.querySelector('.dataHoraSaidaInput').value;

    // Objeto de registro
    const registro = { nome, marca, matricula, cor, horaEntrada, horaSaida };

    // Armazena no localStorage
    let registros = JSON.parse(localStorage.getItem('tabelaRegistros')) || [];
    registros.push(registro);
    localStorage.setItem('tabelaRegistros', JSON.stringify(registros));

    alert('Registro salvo com sucesso!');
    card.remove(); // Remove o card após registro
}
function pesquisarCarros() {
    const termo = document.getElementById('searchInput').value.toLowerCase();
    const container = document.getElementById('carrosContainer');
    container.innerHTML = ''; // Limpa os cards anteriores

    // Recupera os utentes do localStorage
    const utentes = JSON.parse(localStorage.getItem("utentes")) || [];

    // Filtra os carros de todos os utentes que correspondem ao termo de pesquisa
    let carrosFiltrados = [];
    utentes.forEach(utente => {
        utente.carros.forEach(carro => {
            // Verifica se o termo de pesquisa está presente no nome, marca, matrícula ou cor
            if (
                utente.nome.toLowerCase().includes(termo) ||
                carro.marca.toLowerCase().includes(termo) ||
                carro.matricula.toLowerCase().includes(termo) ||
                carro.cor.toLowerCase().includes(termo)
            ) {
                carro.nome = utente.nome;
                carrosFiltrados.push(carro);
            }
        });
    });

    if (carrosFiltrados.length > 0) {
        carrosFiltrados.sort((a, b) => a.matricula.localeCompare(b.matricula));

        carrosFiltrados.forEach(carro => {
            const card = document.createElement('div');
            card.classList.add('carro-card');

            card.innerHTML = `
                <h3>${carro.nome}</h3>
                <p><strong>Marca:</strong> ${carro.marca}</p>
                <p><strong>Matrícula:</strong> ${carro.matricula}</p>
                <p><strong>Cor:</strong> ${carro.cor}</p>
                <div class="actions">
                    <button onclick="setDataHoraEntrada(this)">Entrou</button>
                    <input type="datetime-local" class="dataHoraEntradaInput">
                </div>
                <div class="actions">
                    <button onclick="setDataHoraSaida(this)">Saiu</button>
                    <input type="datetime-local" class="dataHoraSaidaInput">
                </div>
                <button class="registrar-btn" onclick="registrar(this)">Registrar</button>
            `;

            container.appendChild(card);
        });
    } else {
        // Exibe uma mensagem se nenhum carro for encontrado
        container.innerHTML = '<p>Nenhum carro encontrado.</p>';
    }
}