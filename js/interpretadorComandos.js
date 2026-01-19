class InterpretadorComandos {
  constructor(sistemaArquivos) {
    this.sistemaArquivos = sistemaArquivos; // Referência ao sistema de arquivos
  }

  // Executa o comando baseado na entrada do usuário
  executa(input) {
    this.sistemaArquivos.adicionaHistorico(input); // Salvar histórico
    const argumentos = input.trim().split(" "); // Divide a entrada em argumentos
    const comando = argumentos[0]; // Comando principal é o primeiro argumento

    // Seleciona o comando a ser executado
    switch (comando) {
      case "mkdir":
        return this.mkdir(argumentos[1]);
      case "touch":
        return this.touch(argumentos[1]);
      case "cd":
        return this.cd(argumentos[1]);
      case "pwd":
        return this.pwd();
      case "ls":
        return this.ls(argumentos[1]);
      case "cat":
        return this.cat(argumentos[1]);
      case "echo":
        return this.echo(input);
      case "rm":
        return this.rm(argumentos[1]);
      case "tree":
        return this.tree(this.sistemaArquivos.atual, 0);
      case "rename":
        return this.rename(argumentos[1], argumentos[2]);
      case "history":
        return this.sistemaArquivos.historico.join("\n");
      case "clear":
        return "__clear__";
      case "rmdir":
        return this.rmdir();
      case "head":
        return this.head(argumentos[1], argumentos[2]);
      case "tail":
        return this.tail(argumentos[1], argumentos[2]);
      case "wc":
        return this.wc(argumentos[1]);
      default:
        return "Comando inválido.";
    }
  }

  // Cria um novo diretório
  mkdir(nome) {
    if (!nome) return "Uso: mkdir <nome>";
    if (this.sistemaArquivos.atual.filho[nome]) return "Diretório já existe.";

    this.sistemaArquivos.atual.filho[nome] = new Diretorio(
      nome,
      this.sistemaArquivos.atual,
    );
    return "Diretório criado.";
  }

  // Cria um novo arquivo
  touch(nome) {
    if (!nome) return "Uso: touch <nome>";
    if (this.sistemaArquivos.atual.arquivos[nome]) return "Arquivo já existe.";
    this.sistemaArquivos.atual.arquivos[nome] = new Arquivo(nome);
    return "Arquivo criado.";
  }

  // Navega para outro diretório
  cd(nome) {
    // Navega para o diretório raiz
    if (!nome || nome === "/") {
      this.sistemaArquivos.atual = this.sistemaArquivos.raiz;
      return this.pwd();
    }

    // Navega para o diretório pai
    if (nome === "..") {
      if (this.sistemaArquivos.atual.pai) {
        this.sistemaArquivos.atual = this.sistemaArquivos.atual.pai;
      }
      return this.pwd();
    }

    // Verifica se o subdiretório existe
    if (!this.sistemaArquivos.atual.filho[nome]) {
      return "Diretório inexistente.";
    }

    // Navega para um subdiretório
    this.sistemaArquivos.atual = this.sistemaArquivos.atual.filho[nome];
    return this.pwd();
  }

  // Retorna o caminho do diretório atual
  pwd() {
    let diretorio = this.sistemaArquivos.atual;
    if (diretorio === this.sistemaArquivos.raiz) return "~"; // Verifica se está na raiz

    let caminho = [diretorio.nome];

    // Constrói o caminho completo
    while (diretorio.pai && diretorio.pai !== this.sistemaArquivos.raiz) {
      diretorio = diretorio.pai;
      caminho = diretorio.nome + "/" + caminho;
    }

    return "~/" + caminho;
  }

  // Lista o conteúdo do diretório atual
  ls(flag) {
    if (flag === "-l") {
      let saida = "";

      // Diretórios
      for (let nomeDiretorio in this.sistemaArquivos.atual.filho) {
        const diretorio = this.sistemaArquivos.atual.filho[nomeDiretorio];
        saida += `-> Diretório\n`;
        saida += `  Nome: ${nomeDiretorio}/\n`;
        saida += `  Permissões: ${diretorio.permissoes}\n`;
        saida += `  Dono: ${diretorio.dono}\n`;
        saida += `  Criado: ${diretorio.criadoEm}\n`;
        saida += `----------\n`;
      }

      // Arquivos
      for (let nomeArquivo in this.sistemaArquivos.atual.arquivos) {
        const arquivo = this.sistemaArquivos.atual.arquivos[nomeArquivo];
        saida += `-> Arquivo\n`;
        saida += `  Nome: ${nomeArquivo}\n`;
        saida += `  Tamanho: ${arquivo.tamanho} bytes\n`;
        saida += `  Permissões: ${arquivo.permissoes}\n`;
        saida += `  Dono: ${arquivo.dono}\n`;
        saida += `  Criado: ${arquivo.criadoEm}\n`;
        saida += `----------\n`;
      }

      return saida;
    }

    return "Uso: ls -l";
  }

  // Exibe o conteúdo de um arquivo
  cat(nome) {
    if (!nome) return "Uso: cat <arquivo>";
    if (!this.sistemaArquivos.atual.arquivos[nome]) {
      return "Arquivo não encontrado.";
    }
    return this.sistemaArquivos.atual.arquivos[nome].conteudo;
  }

  // Escreve texto em um arquivo
  echo(input) {
    const correspondencia = input.match(/echo (.*) >>? (\S+)/); // Regex para verificar qual o tipo de echo e pegar os parâmetros

    if (!correspondencia) return "Uso: echo <texto> > <arquivo>";

    let texto = correspondencia[1];
    let arquivo = correspondencia[2];

    // Cria o arquivo se não existir
    if (!this.sistemaArquivos.atual.arquivos[arquivo]) {
      this.sistemaArquivos.atual.arquivos[arquivo] = new Arquivo(arquivo);
    }

    // Inclui ou escreve o texto no arquivo
    if (input.includes(">>")) {
      this.sistemaArquivos.atual.arquivos[arquivo].conteudo += texto;
    } else {
      this.sistemaArquivos.atual.arquivos[arquivo].conteudo = texto;
    }

    arquivoTexto.tamanho = arquivoTexto.conteudo.length + 4 * 1024;

    return "Conteúdo escrito.";
  }

  // Remove um arquivo ou diretório
  rm(nome) {
    if (!nome) return "Uso: rm <nome>";

    if (this.sistemaArquivos.atual.arquivos[nome]) {
      delete this.sistemaArquivos.atual.arquivos[nome];
      return "Arquivo removido.";
    }
    if (this.sistemaArquivos.atual.filho[nome]) {
      delete this.sistemaArquivos.atual.filho[nome];
      return "Diretório removido.";
    }

    return "Nome não encontrado.";
  }

  // Renomeia um arquivo ou diretório
  rename(nomeAntigo, nomeNovo) {
    if (!nomeAntigo || !nomeNovo) return "Uso: rename <antigo> <novo>";

    // Verifica se o arquivo existe
    if (this.sistemaArquivos.atual.arquivos[nomeAntigo]) {
      this.sistemaArquivos.atual.arquivos[nomeNovo] =
        this.sistemaArquivos.atual.arquivos[nomeAntigo]; // Copia o arquivo para o novo nome
      this.sistemaArquivos.atual.arquivos[nomeNovo].nome = nomeNovo; // Atualiza o nome interno do arquivo
      delete this.sistemaArquivos.atual.arquivos[nomeAntigo]; // Remove o arquivo antigo
      return "Arquivo renomeado.";
    }

    // Verifica se é um diretório
    if (this.sistemaArquivos.atual.filho[nomeAntigo]) {
      this.sistemaArquivos.atual.filho[nomeNovo] =
        this.sistemaArquivos.atual.filho[nomeAntigo];
      this.sistemaArquivos.atual.filho[nomeNovo].nome = nomeNovo;
      delete this.sistemaArquivos.atual.filho[nomeAntigo];
      return "Diretório renomeado.";
    }

    return "Nada encontrado.";
  }

  // Mostra a estrutura em árvore do diretório atual
  tree(diretorio, nivel) {
    let resultado = `${" ".repeat(nivel * 2)}- ${diretorio.nome}\n`; // Estrutura árvore do diretório atual (-)

    // Adiciona subdiretórios (filhos) recursivamente
    for (let subdiretorio in diretorio.filho) {
      resultado += this.tree(diretorio.filho[subdiretorio], nivel + 1);
    }

    // Adiciona arquivos no diretório atual
    for (let arquivo in diretorio.arquivos) {
      resultado += `${" ".repeat((nivel + 1) * 2)}* ${arquivo}\n`; // Estrutura árvore do arquivo (*)
    }

    return resultado;
  }

  // Remove um diretório vazio no diretório atual
  rmdir() {
    let diretoriosRemovidos = 0;

    // Percorre todos os subdiretórios do diretório atual
    for (let nome in this.sistemaArquivos.atual.filho) {
      const diretorio = this.sistemaArquivos.atual.filho[nome]; // Obtém o subdiretório

      // Verifica se o subdiretório está vazio
      const temFilhos = Object.keys(diretorio.filho).length > 0;
      const temArquivos = Object.keys(diretorio.arquivos).length > 0;
      if (!temFilhos && !temArquivos) {
        // Remove o subdiretório vazio
        delete this.sistemaArquivos.atual.filho[nome];
        diretoriosRemovidos++;
      }
    }

    if (diretoriosRemovidos === 0) {
      return "Não há diretórios vazios.";
    }

    return `Diretórios vazios removidos.`;
  }

  // Exibe as primeiras N linhas de um arquivo
  head(nome, linhas) {
    // TODO: Implementar funcionalidade de head
    return "Funcionalidade em desenvolvimento.";
  }

  // Exibe as últimas N linhas de um arquivo
  tail(nome, linhas) {
    // TODO: Implementar funcionalidade de tail
    return "Funcionalidade em desenvolvimento.";
  }

  // Conta linhas, palavras e caracteres em um arquivo
  wc(nome) {
    // TODO: Implementar funcionalidade de wc
    return "Funcionalidade em desenvolvimento.";
  }
}
