// Classe principal que simula o sistema de arquivos em árvore
class FileSystem {
  constructor() {
    this.root = new Directory("/"); // Diretório raiz
    this.current = this.root; // Diretório atual
    this.history = []; // Histórico de comandos
  }

  // Salvar comando no histórico
  addHistory(cmd) {
    this.history.push(cmd);
  }
}
