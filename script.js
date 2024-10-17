const pneusPorTipo = {};
const pneusSomados = {};
const pneusSubtraidos = {};

document.getElementById('adicionar').addEventListener('click', () => {
    const tipoPneuSelecionado = document.getElementById('tipoPneu').value;
    let tipoPneu = '';

    // Verifica se o tipo de pneu foi selecionado da lista ou digitado manualmente
    if (tipoPneuSelecionado === 'outro') {
        tipoPneu = document.getElementById('tipoPneuManual').value.trim().toLowerCase();
    } else {
        tipoPneu = tipoPneuSelecionado.trim().toLowerCase();
    }

    const operacao = document.getElementById('operacao').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);

    if (!tipoPneu || isNaN(quantidade)) {
        alert("Por favor, insira um tipo de pneu e uma quantidade válida.");
        return;
    }

    // Inicializa se o tipo de pneu ainda não existe
    if (!pneusPorTipo[tipoPneu]) {
        pneusPorTipo[tipoPneu] = 0;
        pneusSomados[tipoPneu] = 0;
        pneusSubtraidos[tipoPneu] = 0;
    }

    if (operacao === 'a') {
        pneusPorTipo[tipoPneu] += quantidade;
        pneusSomados[tipoPneu] += quantidade;
    } else if (operacao === 's') {
        if (pneusPorTipo[tipoPneu] >= quantidade) {
            pneusPorTipo[tipoPneu] -= quantidade;
            pneusSubtraidos[tipoPneu] += quantidade;
        } else {
            alert(`Erro: você está tentando subtrair mais pneus do que disponíveis (${pneusPorTipo[tipoPneu]} disponíveis).`);
            return;
        }
    }

    atualizarResumo();
});

function atualizarResumo() {
    const resumoUl = document.getElementById('resumo');
    resumoUl.innerHTML = '';

    for (const tipo in pneusPorTipo) {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${tipo.charAt(0).toUpperCase() + tipo.slice(1)}:</strong><br>
            Total somado: ${pneusSomados[tipo]} pneus<br>
            Total subtraído: ${pneusSubtraidos[tipo]} pneus<br>
            Saldo final: ${pneusPorTipo[tipo]} pneus
        `;
        resumoUl.appendChild(li);
    }

    const totalGeral = Object.values(pneusPorTipo).reduce((acc, cur) => acc + cur, 0);
    document.getElementById('totalGeral').innerText = `Total geral de pneus: ${totalGeral}`;
}

// Mostrar campo de texto "Outro" se o usuário escolher "Outro"
document.getElementById('tipoPneu').addEventListener('change', (event) => {
    const outroTipoPneuDiv = document.getElementById('outroTipoPneu');
    if (event.target.value === 'outro') {
        outroTipoPneuDiv.style.display = 'block';
    } else {
        outroTipoPneuDiv.style.display = 'none';
        document.getElementById('tipoPneuManual').value = ''; // Limpa o campo caso o usuário volte a selecionar uma opção
    }
});

