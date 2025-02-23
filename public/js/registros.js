document.addEventListener("DOMContentLoaded", () => {
    carregarRegistros();

    document.getElementById("pesquisa").addEventListener("keyup", filtrarRegistros);
    document.getElementById("exportar").addEventListener("click", () => {
        const opcoesExportacao = document.getElementById("opcoesExportacao");
        opcoesExportacao.style.display = opcoesExportacao.style.display === "block" ? "none" : "block";
    });

    document.getElementById("exportarPDF").addEventListener("click", exportarParaPDF);
    document.getElementById("exportarExcel").addEventListener("click", exportarParaExcel);
    document.getElementById("apagarTodos").addEventListener("click", apagarTodosRegistros);
});

// Função para carregar registros do localStorage
function carregarRegistros() {
    const registros = JSON.parse(localStorage.getItem("tabelaRegistros")) || [];
    const container = document.getElementById("containerRegistros");
    container.innerHTML = "";

    registros.forEach((registro, index) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${registro.nome}</h3>
            <p><strong>Marca:</strong> ${registro.marca}</p>
            <p><strong>Matrícula:</strong> ${registro.matricula}</p>
            <p><strong>Cor:</strong> ${registro.cor}</p>
            <p><strong>Entrada:</strong> ${registro.horaEntrada}</p>
            <p><strong>Saída:</strong> ${registro.horaSaida || "Ainda no local"}</p>
            <button class="btn" onclick="removerRegistro(${index})">Remover</button>
        `;

        container.appendChild(card);
    });
}

// Função para remover um registro específico
function removerRegistro(index) {
    const registros = JSON.parse(localStorage.getItem("tabelaRegistros")) || [];

    if (confirm("Tem certeza que deseja remover este registro?")) {
        registros.splice(index, 1); // Remove apenas o item específico
        localStorage.setItem("tabelaRegistros", JSON.stringify(registros));
        carregarRegistros(); // Atualiza a tela
        alert("Registro removido com sucesso!");
    }
}

// Função para apagar todos os registros com confirmação
function apagarTodosRegistros() {
    if (confirm("Você tem certeza que pretende apagar todos os registros?")) {
        localStorage.removeItem("tabelaRegistros");
        carregarRegistros(); // Atualiza a tela
        alert("Todos os registros foram apagados!");
    }
}

// Função para filtrar registros conforme a pesquisa
function filtrarRegistros() {
    const termo = document.getElementById("pesquisa").value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const nome = card.querySelector("h3").innerText.toLowerCase();
        card.style.display = nome.includes(termo) ? "block" : "none";
    });
}

// Exportação para PDF
function exportarParaPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const registros = JSON.parse(localStorage.getItem("tabelaRegistros")) || [];

    if (registros.length === 0) {
        alert("Não há registros para exportar!");
        return;
    }

    doc.setFontSize(18);
    doc.text("Registros de Estacionamento", 50, 20);

    const dadosTabela = registros.map(registro => [
        registro.nome,
        registro.marca,
        registro.matricula,
        registro.cor,
        registro.horaEntrada,
        registro.horaSaida || "Ainda no local"
    ]);

    doc.autoTable({
        startY: 50,
        head: [["Nome", "Marca", "Matrícula", "Cor", "Entrada", "Saída"]],
        body: dadosTabela
    });

    doc.save("registros_estacionamento.pdf");
}

// Exportação para Excel
function exportarParaExcel() {
    const registros = JSON.parse(localStorage.getItem("tabelaRegistros")) || [];

    if (registros.length === 0) {
        alert("Não há registros para exportar!");
        return;
    }

    const ws = XLSX.utils.json_to_sheet(registros);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Registros");

    XLSX.writeFile(wb, "registros_estacionamento.xlsx");
}
