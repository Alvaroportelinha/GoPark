document.addEventListener("DOMContentLoaded", function () {
    carregarVisitantes();
});

function carregarVisitantes() {
    let lista = document.getElementById("listaVisitantes");
    if (!lista) {
        console.error("Erro: Elemento 'listaVisitantes' não encontrado.");
        return;
    }

    let visitantes = JSON.parse(localStorage.getItem("visitantes")) || [];
    lista.innerHTML = "";

    visitantes.forEach((visitante, index) => {
        let card = document.createElement("div");
        card.className = "card-visitante";
        card.onclick = function (event) {
            if (!event.target.classList.contains("btn-remover")) {
                toggleDetalhes(index);
            }
        };

        card.innerHTML = `
            <h3>${visitante.nome}</h3>
            <p><strong>Data da Visita:</strong> ${visitante.data}</p>
            <div class="detalhes" id="detalhes-${index}" style="display: none;">
                <p><strong>Marca do Veículo:</strong> ${visitante.marcaVeiculo}</p>
                <p><strong>Modelo:</strong> ${visitante.modelo}</p>
                <p><strong>Matrícula:</strong> ${visitante.matricula}</p>
                <p><strong>Cor:</strong> ${visitante.cor}</p>
                <p><strong>Telemóvel:</strong> ${visitante.telemovel}</p>
                <p><strong>Email:</strong> ${visitante.email}</p>
                <p><strong>Motivo da Visita:</strong> ${visitante.motivoVisita}</p>
                <p><strong>Hora de Entrada:</strong> ${visitante.horaEntrada}</p>
                <p><strong>Autorização:</strong> ${visitante.autorizacao}</p>
                <button class="btn-remover" onclick="removerVisitante(${index})" style="display: none;">Remover</button>
            </div>
        `;
        lista.appendChild(card);
    });
}

function toggleDetalhes(index) {
    let detalhes = document.getElementById(`detalhes-${index}`);
    let botaoRemover = detalhes.querySelector(".btn-remover");
    if (detalhes.style.display === "none") {
        detalhes.style.display = "block";
        botaoRemover.style.display = "block";
    } else {
        detalhes.style.display = "none";
        botaoRemover.style.display = "none";
    }
}

function removerVisitante(index) {
    let visitantes = JSON.parse(localStorage.getItem("visitantes")) || [];
    visitantes.splice(index, 1);
    localStorage.setItem("visitantes", JSON.stringify(visitantes));
    carregarVisitantes();
}

function apagarTodos() {
    let confirmacao = confirm("Você deseja apagar todos os dados?");
    if (confirmacao) {
        localStorage.removeItem("visitantes");
        carregarVisitantes();
    }
}

// Função para exportar para PDF
function exportarPDF() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();
    let visitantes = JSON.parse(localStorage.getItem("visitantes")) || [];

    if (visitantes.length === 0) {
        alert("Não há visitantes para exportar.");
        return;
    }

    doc.text("Lista de Visitantes", 10, 10);

    let y = 20;
    visitantes.forEach((visitante, index) => {
        doc.text(`Nome: ${visitante.nome}`, 10, y);
        doc.text(`Data da Visita: ${visitante.data}`, 10, y + 5);
        doc.text(`Matrícula: ${visitante.matricula}`, 10, y + 10);
        doc.text(`Motivo da Visita: ${visitante.motivoVisita}`, 10, y + 15);
        y += 25;
        if (y > 280) {
            doc.addPage();
            y = 10;
        }
    });

    doc.save("visitantes.pdf");
}

// Função para exportar para Excel
function exportarExcel() {
    let visitantes = JSON.parse(localStorage.getItem("visitantes")) || [];

    if (visitantes.length === 0) {
        alert("Não há visitantes para exportar.");
        return;
    }

    let ws_data = [["Nome", "Data da Visita", "Matrícula", "Motivo da Visita"]];

    visitantes.forEach(visitante => {
        ws_data.push([visitante.nome, visitante.data, visitante.matricula, visitante.motivoVisita]);
    });

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, "Visitantes");
    XLSX.writeFile(wb, "visitantes.xlsx");
}

// Função para alternar o menu de exportação
function toggleExportMenu() {
    let menu = document.getElementById("exportMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}
