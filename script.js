const pneusPorTipo = {};
const pneusSomados = {};
const pneusSubtraidos = {};

const tipoPneuSelect = document.getElementById('tipoPneu');
const tipoPneuManualInput = document.getElementById('tipoPneuManual');
const operacaoSelect = document.getElementById('operacao');
const quantidadeInput = document.getElementById('quantidade');
const adicionarButton = document.getElementById('adicionar');
const resumoUl = document.getElementById('resumo');
const totalGeralP = document.getElementById('totalGeral');

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

// Desabilita o botão se os campos não estiverem preenchidos corretamente
function validarFormulario() {
    const tipoPneuValido = tipoPneuSelect.value || tipoPneuManualInput.value.trim();
    const quantidadeValida = quantidadeInput.value > 0;
    adicionarButton.disabled = !(tipoPneuValido && quantidadeValida);
}

// Mostra o campo "Outro" se o tipo de pneu for "Outro"
tipoPneuSelect.addEventListener('change', (event) => {
    const outroTipoPneuDiv = document.getElementById('outroTipoPneu');
    if (event.target.value === 'outro') {
        outroTipoPneuDiv.style.display = 'block';
    } else {
        outroTipoPneuDiv.style.display = 'none';
        tipoPneuManualInput.value = ''; // Limpa o campo se não for "Outro"
    }
    validarFormulario();
});

// Validação em tempo real no campo de quantidade
quantidadeInput.addEventListener('input', validarFormulario);

// Adiciona um evento ao botão de adicionar/subtrair
adicionarButton.addEventListener('click', () => {
    const tipoPneuSelecionado = tipoPneuSelect.value;
    let tipoPneu = '';

    // Verifica se o tipo de pneu foi selecionado da lista ou digitado manualmente
    if (tipoPneuSelecionado === 'outro') {
        tipoPneu = tipoPneuManualInput.value.trim().toLowerCase();
    } else {
        tipoPneu = tipoPneuSelecionado.trim().toLowerCase();
    }

    const operacao = operacaoSelect.value;
    const quantidade = parseInt(quantidadeInput.value);

    // Verifica se todos os campos estão preenchidos corretamente
    if (!tipoPneu || isNaN(quantidade) || quantidade <= 0) {
        alert("Por favor, insira um tipo de pneu e uma quantidade válida.");
        return;
    }

    // Inicializa se o tipo de pneu ainda não existe
    if (!pneusPorTipo[tipoPneu]) {
        pneusPorTipo[tipoPneu] = 0;
        pneusSomados[tipoPneu] = 0;
        pneusSubtraidos[tipoPneu] = 0;
    }

    // Operação de adicionar ou subtrair pneus
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

    // Feedback visual ao clicar no botão
    adicionarButton.classList.add('botao-clicado');
    setTimeout(() => {
        adicionarButton.classList.remove('botao-clicado');
    }, 150);

    // Limpa o campo de quantidade após a operação
    quantidadeInput.value = '';
    validarFormulario();
});

function atualizarResumo() {
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
    totalGeralP.innerText = `Total geral de pneus: ${totalGeral}`;
}

// Valida o formulário no carregamento
validarFormulario();
