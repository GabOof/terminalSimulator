// Simula o sistema de arquivos em árvore
class SistemaArquivos {
  constructor() {
    this.raiz = new Diretorio("/"); // Diretório raiz
    this.atual = this.raiz; // Diretório atual
    this.historico = []; // Histórico de comandos
  }

  // Salvar comando no histórico
  adicionaHistorico(comando) {
    this.historico.push(comando);
  }
}
