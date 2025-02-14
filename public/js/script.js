function eliminarLinha(button) {
    const linha = button.parentNode.parentNode; // Encontra a linha (tr) a ser removida
    const marca = linha.querySelector('td:nth-child(2)').textContent; // Obtém a marca do carro
    const matricula = linha.querySelector('td:nth-child(3)').textContent; // Obtém a matrícula do carro

    // Remover a linha da tabela
    linha.remove();

    // Atualizar o localStorage após a remoção
    let carrosCadastrados = JSON.parse(localStorage.getItem('carrosPorMarca')) || {};

    if (carrosCadastrados[marca]) {
        // Filtrar os carros removendo o carro com a matrícula correspondente
        carrosCadastrados[marca] = carrosCadastrados[marca].filter(carro => carro.matricula !== matricula);

        // Se não houver mais carros para essa marca, remover a marca do localStorage
        if (carrosCadastrados[marca].length === 0) {
            delete carrosCadastrados[marca];
        }

        // Atualizar o localStorage com os carros restantes
        localStorage.setItem('carrosPorMarca', JSON.stringify(carrosCadastrados));
    }

    alert('Carro removido com sucesso!');
}