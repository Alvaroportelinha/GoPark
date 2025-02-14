// Função para exibir todos os utentes do localStorage ao carregar a página
function exibirUtentes() {
    const tabelaUtentesBody = document.getElementById('tabelaUtentesBody');
    tabelaUtentesBody.innerHTML = ''; // Limpa a tabela antes de preencher

    // Obtém os carros cadastrados do localStorage
    const carrosCadastrados = JSON.parse(localStorage.getItem('carrosPorMarca')) || {};

    let todosOsCarros = [];

    // Percorre cada marca e adiciona os carros ao array
    for (const marca in carrosCadastrados) {
        carrosCadastrados[marca].forEach(carro => {
            todosOsCarros.push({
                ...carro,
                marcaOriginal: marca
            });
        });
    }

    // Ordena os utentes pelo nome
    todosOsCarros.sort((a, b) => a.nome.localeCompare(b.nome));

    // Preenche a tabela
    todosOsCarros.forEach(carro => {
        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
            <td>${carro.nome}</td>
            <td>${carro.marca}</td>
            <td>${carro.modelo || '-'}</td>
            <td>${carro.matricula}</td>
            <td>${carro.cor}</td>
            <td>${carro.telemovel || '-'}</td>
            <td>${carro.email || '-'}</td>
        `;
        tabelaUtentesBody.appendChild(novaLinha);
    });

    // Exibe um alerta caso não haja utentes cadastrados
    if (todosOsCarros.length === 0) {
        alert('Nenhum utente encontrado no localStorage.');
    }
}

// Chama a função automaticamente quando a página carrega
window.onload = exibirUtentes;
