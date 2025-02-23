document.addEventListener("DOMContentLoaded", function () {
    console.log("Script carregado!");

    // Carregar utentes no campo de seleção
    let utentes = JSON.parse(localStorage.getItem("utentes")) || [];
    let utenteSelect = document.getElementById("utente");

    // Adicionar os utentes dinamicamente no select
    utentes.forEach(utente => {
        let option = document.createElement("option");
        option.value = utente.id;
        option.textContent = utente.nome;
        utenteSelect.appendChild(option);
    });

    // Adicionar evento de submit no formulário
    document.getElementById("form-pagamentos").addEventListener("submit", function (event) {
        event.preventDefault();

        let utenteId = document.getElementById("utente").value;
        let ano = document.getElementById("ano").value;
        let mesesSelecionados = [];

        // Capturar os meses que foram ativados (switch ligado)
        document.querySelectorAll('.switch-container input[type="checkbox"]:checked').forEach((mes) => {
            mesesSelecionados.push(mes.value);
        });

        if (!utenteId || !ano || mesesSelecionados.length === 0) {
            alert("Preencha todos os campos e selecione pelo menos um mês!");
            return;
        }

        // Recuperar pagamentos do localStorage
        let pagamentosData = JSON.parse(localStorage.getItem("pagamentos")) || {};

        // Garantir que o utente tenha um objeto de pagamentos
        if (!pagamentosData[utenteId]) {
            pagamentosData[utenteId] = {};
        }

        // Garantir que o utente tenha um objeto para o ano especificado
        if (!pagamentosData[utenteId][ano]) {
            pagamentosData[utenteId][ano] = {};
        }

        // Atualizar os meses selecionados como "pago"
        mesesSelecionados.forEach(mes => {
            pagamentosData[utenteId][ano][mes] = "pago";
        });

        // Salvar os dados no localStorage
        localStorage.setItem("pagamentos", JSON.stringify(pagamentosData));

        alert("Pagamentos salvos com sucesso!");

        // Limpar o formulário após o envio
        document.getElementById("form-pagamentos").reset();
    });
});
