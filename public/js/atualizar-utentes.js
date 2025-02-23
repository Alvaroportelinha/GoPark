function importarUtentes() {
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

            if (dados.utentes) {
                localStorage.setItem("utentes", JSON.stringify(dados.utentes));
                alert("Lista de utentes atualizada com sucesso!");
            } else {
                alert("Arquivo JSON inválido. Não foi possível identificar os utentes.");
            }
        } catch (error) {
            alert("Erro ao importar utentes! Verifique o arquivo.");
        }
    };

    reader.readAsText(file);
}

function exportarUtentes() {
    const utentes = JSON.parse(localStorage.getItem("utentes")) || [];

    if (utentes.length === 0) {
        alert("Não há utentes para exportar!");
        return;
    }

    const jsonDados = JSON.stringify({ utentes: utentes }, null, 2);
    const blob = new Blob([jsonDados], { type: "application/json" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "utentes.json";
    link.click();
}
