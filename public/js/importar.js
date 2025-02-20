function importarDados() {
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
            localStorage.setItem("carrosPorMarca", JSON.stringify(dados));
            alert("Dados importados com sucesso!");
        } catch (error) {
            alert("Erro ao importar dados! Verifique o arquivo.");
        }
    };

    reader.readAsText(file);
}
