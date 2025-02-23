document.addEventListener("DOMContentLoaded", function () {
    console.log("Script de visualização carregado!");

    let utentes = JSON.parse(localStorage.getItem("utentes")) || [];
    let pagamentosData = JSON.parse(localStorage.getItem("pagamentos")) || {};
    let listaUtentes = document.getElementById("lista-utentes");

    if (!listaUtentes) {
        console.error("Elemento #lista-utentes não encontrado!");
        return;
    }

    // Função para filtrar utentes pelo nome e ano selecionado
    function filtrarUtentes(nomePesquisado, anoSelecionado) {
        return utentes.filter(utente => {
            let pagamentos = pagamentosData[utente.id] || {};
            let temPagamentosNoAno = pagamentos[anoSelecionado] && Object.keys(pagamentos[anoSelecionado]).length > 0;

            return utente.nome.toLowerCase().includes(nomePesquisado.toLowerCase()) &&
                   (anoSelecionado === "" || temPagamentosNoAno);
        });
    }

    // Criar lista de utentes com status de pagamento
    function renderizarUtentes(utentesFiltrados, anoSelecionado) {
        listaUtentes.innerHTML = ''; // Limpar lista antes de renderizar

        utentesFiltrados.forEach(utente => {
            let card = document.createElement("div");
            card.className = "card-utente";

            let pagamentos = pagamentosData[utente.id] ? pagamentosData[utente.id][anoSelecionado] || {} : {};
            let statusGeral = Object.keys(pagamentos).length > 0 ? "Com Pagamento" : "Sem Pagamento";
            let corStatus = statusGeral === "Com Pagamento" ? "green" : "red";

            card.innerHTML = `
                <h3>${utente.nome}</h3>
                <p>ID: ${utente.id}</p>
                <p>Status: <span style="color: ${corStatus}; font-weight: bold;">${statusGeral}</span></p>
                <div class="detalhes" style="display: none;"></div>
            `;

            card.addEventListener("click", function () {
                toggleDetalhes(card, utente.id, anoSelecionado);
            });

            listaUtentes.appendChild(card);
        });
    }

    // Exibir detalhes dos pagamentos por mês
    function toggleDetalhes(card, utenteId, anoSelecionado) {
        let detalhesDiv = card.querySelector(".detalhes");

        if (detalhesDiv.innerHTML === "") {
            detalhesDiv.innerHTML = gerarDetalhes(utenteId, anoSelecionado);
        }

        detalhesDiv.style.display = detalhesDiv.style.display === "none" ? "block" : "none";
    }

    // Gerar lista de meses pagos ou não pagos
    function gerarDetalhes(utenteId, anoSelecionado) {
        let meses = ["janeiro", "fevereiro", "marco", "abril", "maio", "junho", 
                     "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
        let pagamentos = pagamentosData[utenteId] ? pagamentosData[utenteId][anoSelecionado] || {} : {};
        let html = "<ul>";

        meses.forEach(mes => {
            let status = pagamentos[mes] === "pago" ? "Pago" : "Não Pago";
            let cor = status === "Pago" ? "green" : "red";
            html += `<li>${mes.charAt(0).toUpperCase() + mes.slice(1)}: <span style="color: ${cor}; font-weight: bold;">${status}</span></li>`;
        });

        html += "</ul>";
        return html;
    }

    // Renderizar inicialmente todos os utentes sem filtro de ano
    renderizarUtentes(utentes, "");

    // Evento para filtrar por nome
    document.getElementById("searchInput").addEventListener("input", function () {
        let nomePesquisado = this.value;
        let anoSelecionado = document.getElementById("anoFiltro").value;
        let utentesFiltrados = filtrarUtentes(nomePesquisado, anoSelecionado);
        renderizarUtentes(utentesFiltrados, anoSelecionado);
    });

    // Evento para filtrar por ano
    document.getElementById("anoFiltro").addEventListener("change", function () {
        let nomePesquisado = document.getElementById("searchInput").value;
        let anoSelecionado = this.value;
        let utentesFiltrados = filtrarUtentes(nomePesquisado, anoSelecionado);
        renderizarUtentes(utentesFiltrados, anoSelecionado);
    });
});
