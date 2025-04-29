let questoes = [];
let respostas = {};
let indiceAtual = 0;

// Carregar questões e respostas salvas
async function carregarQuestoes() {
  const response = await fetch('http://192.168.1.21:3000/quest/consulta');
  questoes = await response.json();

  // Tentar carregar respostas salvas do localStorage
  const respostasSalvas = localStorage.getItem("respostas");
  if (respostasSalvas) {
    respostas = JSON.parse(respostasSalvas);
  }

  exibirQuestao();
}

function exibirQuestao() {
  const container = document.getElementById("quiz-container");
  const questao = questoes[indiceAtual];

  const alternativas = [
    questao.option1,
    questao.option2,
    questao.option3,
    questao.option4,
  ];

  let alternativasHtml = alternativas.map((alt, i) => {
    const checked = respostas[questao.id] === alt ? "checked" : "";
    const letra = String.fromCharCode(65 + i); // A, B, C, D
    return `
      <label>
        <input type="radio" name="resposta" value="${alt}" ${checked}>
        <strong>${letra})</strong> ${alt}
      </label><br>
    `;
  }).join("");

  container.innerHTML = `
    <p><strong>${indiceAtual + 1}. ${questao.question}</strong></p>
    ${alternativasHtml}
  `;

  atualizarBotoes();
}

function atualizarBotoes() {
  document.getElementById("btnAnterior").disabled = indiceAtual === 0;
  document.getElementById("btnProxima").style.display = (indiceAtual < questoes.length - 1) ? "inline-block" : "none";
  document.getElementById("btnFinalizar").style.display = (indiceAtual === questoes.length - 1) ? "inline-block" : "none";
}

document.getElementById("btnProxima").addEventListener("click", () => {
  salvarResposta();
  if (indiceAtual < questoes.length - 1) {
    indiceAtual++;
    exibirQuestao();
  }
});

document.getElementById("btnAnterior").addEventListener("click", () => {
  salvarResposta();
  if (indiceAtual > 0) {
    indiceAtual--;
    exibirQuestao();
  }
});

// Corrigir prova
document.getElementById("prova").addEventListener("submit", (event) => {
  event.preventDefault();
  salvarResposta();
  let acertos = 0;

  questoes.forEach((questao) => {
    if (respostas[questao.id] === questao.gabarito) {
      acertos++;
    }
  });

  

  // Limpa localStorage após finalizar
  localStorage.removeItem("respostas");
});

// Salvar resposta do usuário e armazenar no localStorage
function salvarResposta() {
  const selecionado = document.querySelector('input[name="resposta"]:checked');
  if (selecionado) {
    respostas[questoes[indiceAtual].id] = selecionado.value;
    localStorage.setItem("respostas", JSON.stringify(respostas));
  }
}

carregarQuestoes();