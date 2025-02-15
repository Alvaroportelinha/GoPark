function registrarVisitante() {
    const nome = document.getElementById("nome").value;
    const marcaVeiculo = document.getElementById("marcaVeiculo").value;
    const modelo = document.getElementById("modelo").value;
    const matricula = document.getElementById("matricula").value;
    const cor = document.getElementById("cor").value;
    const telemovel = document.getElementById("telemovel").value;
    const email = document.getElementById("email").value;
    const motivoVisita = document.getElementById("motivoVisita").value;
    const horaEntrada = document.getElementById("horaEntrada").value;
    const autorizacao = document.getElementById("autorizacao").value;

    if (!nome || !marcaVeiculo || !modelo || !matricula || !cor || !telemovel || !email || !motivoVisita || !horaEntrada || !autorizacao) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const visitante = { nome, marcaVeiculo, modelo, matricula, cor, telemovel, email, motivoVisita, horaEntrada, autorizacao };

    let visitantes = JSON.parse(localStorage.getItem("visitantes")) || [];
    visitantes.push(visitante);
    localStorage.setItem("visitantes", JSON.stringify(visitantes));

    alert("Visitante registrado com sucesso!");

    document.getElementById("formVisitante").reset();
}
