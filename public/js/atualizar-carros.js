// Função para importar utentes e seus carros do arquivo JSON
function importarCarros() {
    const fileInput = document.getElementById("fileInput");

    if (!fileInput || fileInput.files.length === 0) {
        alert("Por favor, selecione um arquivo!");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        try {
            const dados = JSON.parse(event.target.result);
            console.log("Dados importados do JSON:", dados);

            if (dados.utentes && Array.isArray(dados.utentes)) {
                localStorage.setItem("utentes", JSON.stringify(dados.utentes));
                alert("Lista de utentes e carros importada com sucesso!");
            } else {
                alert("Arquivo JSON inválido. Estrutura incorreta.");
            }
        } catch (error) {
            console.error("Erro ao importar carros:", error);
            alert("Erro ao importar carros! Verifique o arquivo.");
        }
    };

    reader.readAsText(file);
}

// Função para exportar utentes e seus carros para um arquivo JSON
function exportarCarros() {
    const utentes = JSON.parse(localStorage.getItem("utentes")) || [];

    console.log("Utentes e carros a serem exportados:", utentes);

    if (utentes.length === 0) {
        alert("Não há dados para exportar!");
        return;
    }

    const jsonDados = JSON.stringify({ utentes: utentes }, null, 2);
    const blob = new Blob([jsonDados], { type: "application/json" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "utentes_carros.json";
    link.click();
}
