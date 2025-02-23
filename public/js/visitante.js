function registrarVisitante() {
    let visitantes = JSON.parse(localStorage.getItem("visitantes")) || []; // Obtém os visitantes já salvos

    let visitante = {
        nome: document.getElementById("nome").value,
        marcaVeiculo: document.getElementById("marcaVeiculo").value,
        modelo: document.getElementById("modelo").value,
        matricula: document.getElementById("matricula").value,
        cor: document.getElementById("cor").value,
        telemovel: document.getElementById("telemovel").value,
        email: document.getElementById("email").value,
        motivoVisita: document.getElementById("motivoVisita").value,
        horaEntrada: document.getElementById("horaEntrada").value,
        autorizacao: document.getElementById("autorizacao").value,
        data: new Date().toLocaleDateString("pt-BR") // Adiciona a data atual
    };

    visitantes.push(visitante); // Adiciona à lista
    localStorage.setItem("visitantes", JSON.stringify(visitantes)); // Salva no localStorage

    alert("Visitante registrado com sucesso!");

    // Limpa o formulário
    document.getElementById("formVisitante").reset();
} 
