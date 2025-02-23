document.addEventListener("DOMContentLoaded", function () {
    console.log("Script de remoção de pagamentos carregado!");

    let utentes = JSON.parse(localStorage.getItem("utentes")) || [];
    let pagamentosData = JSON.parse(localStorage.getItem("pagamentos")) || {};
    let utenteSelect = document.getElementById("utente");

    // Adicionar utentes ao select
    utentes.forEach(utente => {
        let option = document.createElement("option");
        option.value = utente.id;
        option.textContent = utente.nome;
        utenteSelect.appendChild(option);
    });

    // Evento para carregar os pagamentos ao selecionar um utente
    utenteSelect.addEventListener("change", carregarPagamentos);
    document.getElementById("ano").addEventListener("change", carregarPagamentos);

    function carregarPagamentos() {
        let utenteId = utenteSelect.value;
        let ano = document.getElementById("ano").value;
        let mesesCheckboxes = document.querySelectorAll('.switch-container input[type="checkbox"]');

        if (!utenteId || !ano) return;

        let pagamentosUtente = pagamentosData[utenteId]?.[ano] || {};

        mesesCheckboxes.forEach(mesCheckbox => {
            let mes = mesCheckbox.value;
            let switchItem = mesCheckbox.closest(".switch-item"); // Pega o contêiner correto

            if (pagamentosUtente[mes] === "pago") {
                mesCheckbox.checked = true;
                switchItem.style.backgroundColor = "green";  // Atualiza corretamente
            } else {
                mesCheckbox.checked = false;
                switchItem.style.backgroundColor = "red";
            }
        });
    }

    // Evento para alternar os pagamentos
    document.querySelectorAll('.switch-container input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            let switchItem = this.closest(".switch-item");
            if (this.checked) {
                switchItem.style.backgroundColor = "green";
            } else {
                switchItem.style.backgroundColor = "red";
            }
        });
    });

    // Evento para salvar as alterações
    document.getElementById("form-remover-pagamentos").addEventListener("submit", function (event) {
        event.preventDefault();

        let utenteId = document.getElementById("utente").value;
        let ano = document.getElementById("ano").value;

        if (!utenteId || !ano) {
            alert("Selecione um utente e um ano!");
            return;
        }

        if (!pagamentosData[utenteId] || !pagamentosData[utenteId][ano]) {
            alert("Nenhum pagamento encontrado para este utente neste ano.");
            return;
        }

        // Percorrer todos os meses e remover os que não estão marcados
        document.querySelectorAll('.switch-container input[type="checkbox"]').forEach(mesCheckbox => {
            let mes = mesCheckbox.value;

            if (!mesCheckbox.checked) {
                delete pagamentosData[utenteId][ano][mes]; // Remove do objeto
            }
        });

        // Salvar os dados atualizados no localStorage
        localStorage.setItem("pagamentos", JSON.stringify(pagamentosData));

        alert("Pagamentos removidos com sucesso!");
        carregarPagamentos(); // Atualiza os switches na tela
    });
});
