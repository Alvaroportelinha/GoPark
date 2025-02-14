<script>
// Função para registrar o visitante e adicionar os dados à tabela
function registrarVisitante() {
    const nome = document.getElementById("nome").value;
    const marcaVeiculo = document.getElementById("marcaVeiculo").value;
    const modelo = document.getElementById("modelo").value;
    const matricula = document.getElementById("matricula").value;
    const cor = document.getElementById("cor").value;
    const telemovel = document.getElementById("telemovel").value;
    const email = document.getElementById("email").value;
    const motivoVisita = document.getElementById("motivoVisita").value;
    const horaEntrada = document.getElementById("horaEntrada").value;
    const autorizacao = document.getElementById("autorizacao").value;

    if (!nome || !marcaVeiculo || !modelo || !matricula || !cor || !telemovel || !email || !motivoVisita || !horaEntrada || !autorizacao) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const visitante = {
        nome, marcaVeiculo, modelo, matricula, cor, telemovel, email, motivoVisita, horaEntrada, autorizacao
    };

    adicionarVisitanteNaTabela(visitante);
    salvarVisitanteLocalStorage(visitante);

    document.getElementById("formVisitante").reset();
}

// Função para adicionar o visitante na tabela
function adicionarVisitanteNaTabela(visitante) {
    const tabela = document.getElementById("tabelaVisitantes").getElementsByTagName('tbody')[0];
    const novaLinha = tabela.insertRow();

    novaLinha.insertCell(0).innerText = visitante.nome;
    novaLinha.insertCell(1).innerText = visitante.marcaVeiculo;
    novaLinha.insertCell(2).innerText = visitante.modelo;
    novaLinha.insertCell(3).innerText = visitante.matricula;
    novaLinha.insertCell(4).innerText = visitante.cor;
    novaLinha.insertCell(5).innerText = visitante.telemovel;
    novaLinha.insertCell(6).innerText = visitante.email;
    novaLinha.insertCell(7).innerText = visitante.motivoVisita;
    novaLinha.insertCell(8).innerText = visitante.horaEntrada;
    novaLinha.insertCell(9).innerText = visitante.autorizacao;
}

// Função para salvar o visitante no localStorage
function salvarVisitanteLocalStorage(visitante) {
    let visitantes = JSON.parse(localStorage.getItem("visitantes")) || [];
    visitantes.push(visitante);
    localStorage.setItem("visitantes", JSON.stringify(visitantes));
}

// Função para carregar os visitantes do localStorage ao carregar a página
function carregarVisitantes() {
    const visitantes = JSON.parse(localStorage.getItem("visitantes")) || [];
    visitantes.forEach(visitante => adicionarVisitanteNaTabela(visitante));
}

// Função para apagar todos os visitantes
function apagarTodos() {
    localStorage.removeItem("visitantes");
    const tabela = document.getElementById("tabelaVisitantes").getElementsByTagName('tbody')[0];
    tabela.innerHTML = ""; // Remove todas as linhas da tabela
}

// Carrega os visitantes salvos ao iniciar a página
window.onload = carregarVisitantes;
</script>