class InterpretadorComandos {
  constructor(sistemaArquivos) {
    this.sistemaArquivos = sistemaArquivos; // Referência ao sistema de arquivos
  }

  executa(input) {
    this.sistemaArquivos.adicionaHistorico(input); // Salvar histórico
    const argumentos = input.trim().split(" ");
    const cmd = argumentos[0];

    switch (cmd) {
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
      this.sistemaArquivos.atual
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
    if (diretorio === this.sistemaArquivos.raiz) return "~";

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
    let saida = "";

    if (flag === "-l") {
      for (let diretorio in this.sistemaArquivos.atual.filho) {
        saida += `diretório rwx ${diretorio}\n`;
      }

      for (let arquivo in this.sistemaArquivos.atual.arquivos) {
        saida += `arquivo rw- ${arquivo}\n`;
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
    const correspondencia = input.match(/echo (.*) >>? (\S+)/);

    if (!correspondencia) return "Uso: echo <texto> > <arquivo>";

    let texto = correspondencia[1];
    let arquivo = correspondencia[2];

    if (!this.sistemaArquivos.atual.arquivos[arquivo]) {
      this.sistemaArquivos.atual.arquivos[arquivo] = new Arquivo(arquivo);
    }

    if (input.includes(">>")) {
      this.sistemaArquivos.atual.arquivos[arquivo].conteudo += texto;
    } else {
      this.sistemaArquivos.atual.arquivos[arquivo].conteudo = texto;
    }

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

  // Remove um diretório vazio
  rmdir() {
    // TODO: Implementar funcionalidade de rmdir

    return "Funcionalidade em desenvolvimento.";
  }

  // Renomeia um arquivo ou diretório
  rename(nomeAntigo, nomeNovo) {
    if (!nomeAntigo || !nomeNovo) return "Uso: rename <antigo> <novo>";

    // Verifica se o arquivo existe
    if (this.sistemaArquivos.atual.arquivos[nomeAntigo]) {
      this.sistemaArquivos.atual.arquivos[nomeNovo] =
        this.sistemaArquivos.atual.arquivos[nomeAntigo];
      this.sistemaArquivos.atual.arquivos[nomeNovo].nome = nomeNovo;
      delete this.sistemaArquivos.atual.arquivos[nomeAntigo];
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
  tree(diretorio, level) {
    // TODO: Implementar funcionalidade de árvore

    return "Funcionalidade em desenvolvimento.";
  }
}
