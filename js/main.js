// Instâncias
const sistemaArquivos = new SistemaArquivos();
const interpretador = new InterpretadorComandos(sistemaArquivos);
const elementoPrompt = document.querySelector(".prompt");

// Elementos DOM
const campoEntrada = document.getElementById("inputComando");
const areaSaida = document.getElementById("output");
const arvoreSidebar = document.getElementById("arvoreArquivos");

// Função para imprimir no terminal
function imprimirNoTerminal(mensagem) {
  areaSaida.innerText += mensagem + "\n";
  areaSaida.scrollTop = areaSaida.scrollHeight; // Rola para o final
}

// Gera representação da árvore para a barra lateral
function gerarRepresentacaoArvore(diretorio, nivel = 0) {
  let resultado = `${" ".repeat(nivel * 2)}- ${diretorio.name}\n`;

  // Adiciona subdiretórios (filhos) e arquivos recursivamente
  for (let subdiretorio in diretorio.children)
    resultado += gerarRepresentacaoArvore(
      diretorio.children[subdiretorio],
      nivel + 1
    );

  // Adiciona arquivos no diretório atual
  for (let arquivo in diretorio.files)
    resultado += `${" ".repeat((nivel + 1) * 2)}* ${arquivo}\n`;

  return resultado;
}

// Atualiza painel lateral
function atualizarPainelLateral() {
  arvoreSidebar.innerText = gerarRepresentacaoArvore(sistemaArquivos.root, 0);
}

// Atualiza o prompt com o diretório atual
function atualizarPrompt() {
  elementoPrompt.innerText = interpretador.pwd() + " $";
}

// Ouvinte de eventos para entrada de comandos
campoEntrada.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    const comando = campoEntrada.value;

    imprimirNoTerminal(`${interpretador.pwd()} $ ${comando}`); // Imprime o comando digitado com nome do diretório

    const resultado = interpretador.execute(comando);

    // Limpa a tela se o comando for 'clear'
    if (resultado === "__clear__") {
      areaSaida.innerText = "";
      imprimirNoTerminal(interpretador.pwd() + " $");
      campoEntrada.value = "";
      return;
    }

    // Imprime o resultado do comando, somente se houver
    if (resultado !== undefined && resultado !== null) {
      imprimirNoTerminal(resultado);
    }

    campoEntrada.value = "";

    atualizarPainelLateral(); // sempre atualiza o painel lateral após qualquer comando
    atualizarPrompt(); // atualiza o prompt
  }
});

// Atualiza tudo ao carregar a página
atualizarPainelLateral();
atualizarPrompt();
