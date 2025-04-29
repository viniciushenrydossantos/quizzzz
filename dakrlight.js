// Exibe ou oculta as opções de tema
document.getElementById('themeButton').addEventListener('click', function () {
    const themeOptions = document.getElementById('themeOptions');
    themeOptions.style.display = themeOptions.style.display === 'block' ? 'none' : 'block';
});

// Alterna para o Modo Claro
document.getElementById('light-mode').addEventListener('click', function () {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    document.getElementById('themeButton').textContent = '🌙 Modo Escuro';
    document.getElementById('themeOptions').style.display = 'none'; // Fecha o menu
});

// Alterna para o Modo Escuro
document.getElementById('dark-mode').addEventListener('click', function () {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    document.getElementById('themeButton').textContent = '🌞 Modo Claro';
    document.getElementById('themeOptions').style.display = 'none'; // Fecha o menu
});
