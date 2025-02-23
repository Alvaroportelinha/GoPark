function importarPagamentos() {
    const fileInput = document.getElementById("fileInput");
    if (fileInput.files.length === 0) {
        alert("Por favor, selecione um arquivo!");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        try {
            const dados = JSON.parse(event.target.result);

            if (dados.pagamentos) {
                localStorage.setItem("pagamentos", JSON.stringify(dados.pagamentos));
                alert("Lista de pagamentos atualizada com sucesso!");
            } else {
                alert("Arquivo JSON inválido. Não foi possível identificar os pagamentos.");
            }
        } catch (error) {
            alert("Erro ao importar pagamentos! Verifique o arquivo.");
        }
    };

    reader.readAsText(file);
}

function exportarPagamentos() {
    const pagamentos = JSON.parse(localStorage.getItem("pagamentos")) || [];

    if (pagamentos.length === 0) {
        alert("Não há pagamentos para exportar!");
        return;
    }

    const jsonDados = JSON.stringify({ pagamentos: pagamentos }, null, 2);
    const blob = new Blob([jsonDados], { type: "application/json" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "pagamentos.json";
    link.click();
}
