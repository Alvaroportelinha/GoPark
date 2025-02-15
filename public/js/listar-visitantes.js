function adicionarVisitanteNaTabela(visitante) {
    const tabela = document.getElementById("tabelaVisitantes").getElementsByTagName("tbody")[0];

    const novaLinha = tabela.insertRow();

    novaLinha.insertCell(0).textContent = visitante.nome;
    novaLinha.insertCell(1).textContent = visitante.marcaVeiculo;
    novaLinha.insertCell(2).textContent = visitante.modelo;
    novaLinha.insertCell(3).textContent = visitante.matricula;
    novaLinha.insertCell(4).textContent = visitante.cor;
    novaLinha.insertCell(5).textContent = visitante.telemovel;
    novaLinha.insertCell(6).textContent = visitante.email;
    novaLinha.insertCell(7).textContent = visitante.motivoVisita;
    novaLinha.insertCell(8).textContent = visitante.horaEntrada;
    novaLinha.insertCell(9).textContent = visitante.autorizacao;
}

function carregarVisitantes() {
    const visitantes = JSON.parse(localStorage.getItem("visitantes")) || [];
    console.log("Visitantes carregados:", visitantes);

    if (visitantes.length === 0) {
        console.log("Nenhum visitante encontrado.");
        return;
    }

    visitantes.forEach(visitante => adicionarVisitanteNaTabela(visitante));
}

function apagarTodos() {
    localStorage.removeItem("visitantes");
    document.getElementById("tabelaVisitantes").getElementsByTagName("tbody")[0].innerHTML = "";
    alert("Todos os visitantes foram apagados.");
}

// Carrega os visitantes ao iniciar a página
window.onload = carregarVisitantes;
