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
    localStorage.removeItem("visitantes");
    carregarVisitantes();
}
