document.addEventListener("DOMContentLoaded", carregarUtentes);

function carregarUtentes() {
    const utenteSelect = document.getElementById("utente");
    let utentes = JSON.parse(localStorage.getItem("utentes")) || [];

    if (utentes.length === 0) {
        console.warn("Nenhum utente encontrado no localStorage.");
    }

    // Ordena os utentes pelo nome em ordem alfabética
    utentes.sort((a, b) => a.nome.localeCompare(b.nome));

    // Limpar opções anteriores
    utenteSelect.innerHTML = '<option value="">Escolha um utente</option>';

    utentes.forEach(utente => {
        let option = document.createElement("option");
        option.value = utente.id;
        option.textContent = utente.nome;
        utenteSelect.appendChild(option);
    });
}

function registrarCarro() {
    const utenteId = document.getElementById('utente').value;
    const marca = document.getElementById('inputMarca').value;
    const modelo = document.getElementById('modelo').value;
    const matricula = document.getElementById('matricula').value;
    const cor = document.getElementById('cor').value;

    if (!utenteId) {
        alert("Por favor, selecione um utente.");
        return;
    }

    // Criar objeto do carro
    const novoCarro = { marca, modelo, matricula, cor };

    // Buscar utentes no localStorage
    let utentes = JSON.parse(localStorage.getItem("utentes")) || [];

    // Encontrar o utente pelo ID e adicionar o carro
    let utenteIndex = utentes.findIndex(u => String(u.id) === String(utenteId));
    if (utenteIndex !== -1) {
        utentes[utenteIndex].carros.push(novoCarro);
        localStorage.setItem("utentes", JSON.stringify(utentes));
        alert("Carro adicionado com sucesso!");
        document.getElementById('form-novocarro').reset();
    } else {
        alert("Erro ao encontrar o utente.");
    }
}
