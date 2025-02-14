
function adicionarCarro() {
    // Coletando os valores dos inputs
    const nome = document.getElementById('inputNome').value;
    const marca = document.getElementById('inputMarca').value;
    const modelo = document.getElementById('inputModelo').value;
    const matricula = document.getElementById('inputMatricula').value;
    const cor = document.getElementById('inputCor').value;
    const telemovel = document.getElementById('inputTelemovel').value;
    const email = document.getElementById('inputEmail').value;

    // Criando um objeto carro
    const carro = {
        nome,
        marca,
        modelo,
        matricula,
        cor,
        telemovel,
        email,
        entrada: null,
        saida: null
    };

    // Armazenar o carro em localStorage por marca
    let carrosCadastrados = JSON.parse(localStorage.getItem('carrosPorMarca')) || {};
    if (!carrosCadastrados[marca]) {
        carrosCadastrados[marca] = [];
    }
    carrosCadastrados[marca].push(carro);
    localStorage.setItem('carrosPorMarca', JSON.stringify(carrosCadastrados));

    // Adicionando o carro na tabela
    const tabelaBody = document.getElementById('tabelaBody');
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
        <td>${nome}</td>
        <td>${marca}</td>
        <td>${modelo}</td>
        <td>${matricula}</td>
        <td>${cor}</td>
        <td>${telemovel}</td>
        <td>${email}</td>
    `;
    tabelaBody.appendChild(novaLinha);

    alert('Carro cadastrado com sucesso!');
    
    // Limpa o formulário
    document.getElementById('formCarro').reset();
}
