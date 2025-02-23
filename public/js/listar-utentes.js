document.addEventListener("DOMContentLoaded", function () {
    listarUtentes();

    // Evento para filtrar registros na pesquisa
    document.getElementById("pesquisaUtentes").addEventListener("keyup", filtrarUtentes);
});

function listarUtentes() {
    const container = document.getElementById("containerUtentes");
    container.innerHTML = ""; // Limpar antes de adicionar os dados

    // Recuperar utentes do localStorage
    let utentes = JSON.parse(localStorage.getItem("utentes")) || [];

    if (utentes.length === 0) {
        container.innerHTML = "<p>Nenhum utente cadastrado.</p>";
        document.getElementById("totalUtentes").textContent = "Total de Utentes: 0";
        return;
    }

    // Ordenar os utentes por nome (alfabeticamente)
    utentes.sort((a, b) => a.nome.localeCompare(b.nome));

    // Criar os cards para os utentes
    utentes.forEach(utente => {
        const card = document.createElement("div");
        card.classList.add("card-utente");
        card.innerHTML = `
            <h3>${utente.nome}</h3>
            <div class="detalhes" style="display: none;">
                <p><strong>Telemóvel:</strong> ${utente.telemovel || "-"}</p>
                <p><strong>Email:</strong> ${utente.email || "-"}</p>
            </div>
        `;

        // Evento para expandir/clicar no card
        card.addEventListener("click", () => {
            const detalhes = card.querySelector(".detalhes");
            detalhes.style.display = detalhes.style.display === "none" ? "block" : "none";
        });

        container.appendChild(card);
    });

    // Atualizar o total de utentes
    atualizarTotalUtentes(utentes.length);
}

// Função para filtrar os utentes com base na pesquisa
function filtrarUtentes() {
    const termo = document.getElementById("pesquisaUtentes").value.toLowerCase();
    const cards = document.querySelectorAll(".card-utente");

    cards.forEach(card => {
        const nome = card.querySelector("h3").innerText.toLowerCase();
        if (nome.includes(termo)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });

    // Atualizar o total de utentes após a filtragem
    const totalVisiveis = document.querySelectorAll(".card-utente[style='display: block;']").length;
    atualizarTotalUtentes(totalVisiveis);
}

// Função para atualizar o número total de utentes
function atualizarTotalUtentes(total) {
    document.getElementById("totalUtentes").textContent = `Total de Utentes: ${total}`;
}
