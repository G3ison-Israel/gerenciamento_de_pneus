/*const pneusPorTipo = {};
const pneusSomados = {};
const pneusSubtraidos = {};

const tipoPneuSelect = document.getElementById('tipoPneu');
const tipoPneuManualInput = document.getElementById('tipoPneuManual');
const operacaoSelect = document.getElementById('operacao');
const quantidadeInput = document.getElementById('quantidade');
const adicionarButton = document.getElementById('adicionar');
const resumoUl = document.getElementById('resumo');
const totalGeralP = document.getElementById('totalGeral');
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
        tipoPneu = tipoPneuManualInput.value.trim().toUpperCase();
    } else {
        tipoPneu = tipoPneuSelecionado.trim().toUpperCase();
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
validarFormulario();*/


/*
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

// Função para salvar o estado atual do relatório no localStorage
function salvarRelatorio() {
    const dados = {
        pneusPorTipo,
        pneusSomados,
        pneusSubtraidos
    };
    localStorage.setItem('relatorioPneus', JSON.stringify(dados));
}

// Função para carregar o estado salvo do relatório
function carregarRelatorio() {
    const dadosSalvos = localStorage.getItem('relatorioPneus');
    if (dadosSalvos) {
        const dados = JSON.parse(dadosSalvos);
        Object.assign(pneusPorTipo, dados.pneusPorTipo);
        Object.assign(pneusSomados, dados.pneusSomados);
        Object.assign(pneusSubtraidos, dados.pneusSubtraidos);
    }
}

// Carrega o estado salvo ao iniciar
window.addEventListener('DOMContentLoaded', function() {
    carregarRelatorio();
    atualizarResumo(); // Atualiza o resumo com os dados carregados
    validarFormulario(); // Valida o formulário no início
});

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
        tipoPneu = tipoPneuManualInput.value.trim().toUpperCase();
    } else {
        tipoPneu = tipoPneuSelecionado.trim().toUpperCase();
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
    salvarRelatorio(); // Salva o estado atualizado após cada alteração

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
*/


const pneusPorTipo = {};
const pneusSomados = {};
const pneusSubtraidos = {};

const tipoPneuSelect = document.getElementById('tipoPneu');
const tipoPneuManualInput = document.getElementById('tipoPneuManual');
const operacaoSelect = document.getElementById('operacao');
const quantidadeInput = document.getElementById('quantidade');
const adicionarButton = document.getElementById('adicionar');
const resetarButton = document.getElementById('resetar'); // Certifique-se de que este ID está correto
const resumoUl = document.getElementById('resumo');
const totalGeralP = document.getElementById('totalGeral');

// Função para salvar o estado atual do relatório no localStorage
function salvarRelatorio() {
    const dados = {
        pneusPorTipo,
        pneusSomados,
        pneusSubtraidos
    };
    localStorage.setItem('relatorioPneus', JSON.stringify(dados));
}

// Função para carregar o estado salvo do relatório
function carregarRelatorio() {
    const dadosSalvos = localStorage.getItem('relatorioPneus');
    if (dadosSalvos) {
        const dados = JSON.parse(dadosSalvos);
        Object.assign(pneusPorTipo, dados.pneusPorTipo);
        Object.assign(pneusSomados, dados.pneusSomados);
        Object.assign(pneusSubtraidos, dados.pneusSubtraidos);
    }
}

// Função para resetar o relatório
function resetarRelatorio() {
    // Limpa os objetos para um novo relatório
    for (const key in pneusPorTipo) delete pneusPorTipo[key];
    for (const key in pneusSomados) delete pneusSomados[key];
    for (const key in pneusSubtraidos) delete pneusSubtraidos[key];
    
    // Remove os dados do localStorage
    localStorage.removeItem('relatorioPneus');

    atualizarResumo(); // Atualiza o resumo para exibir o estado vazio
    alert("Relatório reiniciado com sucesso!"); // Confirmação de reset
}

// Carrega o estado salvo ao iniciar
window.addEventListener('DOMContentLoaded', function() {
    carregarRelatorio();
    atualizarResumo(); // Atualiza o resumo com os dados carregados
    validarFormulario(); // Valida o formulário no início

    // Adiciona o evento de reset ao botão de reiniciar
    resetarButton.addEventListener('click', resetarRelatorio);
});

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
        tipoPneu = tipoPneuManualInput.value.trim().toUpperCase();
    } else {
        tipoPneu = tipoPneuSelecionado.trim().toUpperCase();
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
    salvarRelatorio(); // Salva o estado atualizado após cada alteração

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