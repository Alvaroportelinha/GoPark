document.addEventListener("DOMContentLoaded", () => {
    carregarRegistros();

    document.getElementById("exportarPDF").addEventListener("click", exportarParaPDF);
    document.getElementById("limparRegistros").addEventListener("click", limparRegistros);
});

// Função para carregar os registros salvos no localStorage
function carregarRegistros() {
    const registros = JSON.parse(localStorage.getItem("tabelaRegistros")) || [];
    const tabelaBody = document.querySelector("#tabelaRegistros tbody");
    tabelaBody.innerHTML = "";

    registros.forEach((registro, index) => {
        const row = tabelaBody.insertRow();
        row.innerHTML = `
            <td>${registro.nome}</td>
            <td>${registro.marca}</td>
            <td>${registro.matricula}</td>
            <td>${registro.cor}</td>
            <td>${registro.horaEntrada}</td>
            <td>${registro.horaSaida}</td>
            <td><button onclick="removerRegistro(${index})">Remover</button></td>
        `;
    });
}

// Função para remover um registro específico
function removerRegistro(index) {
    let registros = JSON.parse(localStorage.getItem("tabelaRegistros")) || [];
    registros.splice(index, 1);
    localStorage.setItem("tabelaRegistros", JSON.stringify(registros));
    carregarRegistros();
}

// Função para limpar todos os registros
function limparRegistros() {
    if (confirm("Tem certeza que deseja limpar todos os registros?")) {
        localStorage.removeItem("tabelaRegistros");
        carregarRegistros();
    }
}

// Função para exportar os registros para um PDF formatado
function exportarParaPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const registros = JSON.parse(localStorage.getItem("tabelaRegistros")) || [];

    if (registros.length === 0) {
        alert("Não há registros para exportar!");
        return;
    }

    // Adiciona o logo ao PDF
    const logo = new Image();
    logo.src = "../../img/logo_cosap_1.png";
    logo.onload = function () {
        doc.addImage(logo, "PNG", 10, 10, 30, 30);

        // Título do PDF
        doc.setFontSize(18);
        doc.text("Registros de Estacionamento", 50, 20);

        // Convertendo dados da tabela para um array
        const dadosTabela = registros.map((registro) => [
            registro.nome,
            registro.marca,
            registro.matricula,
            registro.cor,
            registro.horaEntrada,
            registro.horaSaida
        ]);

        // Criando a tabela no PDF com autoTable
        doc.autoTable({
            startY: 50,
            head: [["Nome", "Marca", "Matrícula", "Cor", "Entrada", "Saída"]],
            body: dadosTabela
        });

        // Salvando o PDF
        doc.save("registros_estacionamento.pdf");
    };

    // Caso a imagem falhe ao carregar, gerar o PDF mesmo assim
    logo.onerror = function () {
        gerarPDFSemImagem(doc, registros);
    };
}

// Função para gerar o PDF sem imagem caso o logo falhe ao carregar
function gerarPDFSemImagem(doc, registros) {
    doc.setFontSize(18);
    doc.text("Registros de Estacionamento", 50, 20);

    const dadosTabela = registros.map((registro) => [
        registro.nome,
        registro.marca,
        registro.matricula,
        registro.cor,
        registro.horaEntrada,
        registro.horaSaida
    ]);

    doc.autoTable({
        startY: 50,
        head: [["Nome", "Marca", "Matrícula", "Cor", "Entrada", "Saída"]],
        body: dadosTabela
    });

    doc.save("registros_estacionamento.pdf");
}
