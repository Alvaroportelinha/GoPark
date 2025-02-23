function registrarUtente() {
    const nome = document.getElementById('nome').value;
    const telemovel = document.getElementById('telemovel').value;
    const email = document.getElementById('email').value;

    if (!nome.trim()) {
        alert("Por favor, insira o nome do utente.");
        return;
    }

    // Gerar um ID aleatório de 4 dígitos
    const id = Math.floor(1000 + Math.random() * 9000); 

    const novoUtente = { id, nome, telemovel, email, carros: [] };

    // Recuperar utentes do localStorage
    let utentes = JSON.parse(localStorage.getItem('utentes')) || [];
    utentes.push(novoUtente);

    // Salvar no localStorage
    localStorage.setItem('utentes', JSON.stringify(utentes));

    alert("Utente cadastrado com sucesso!");
    document.getElementById('form-novoutente').reset();

    // Atualizar a página "ver-pagamentos"
    atualizarPagamentos();
}
