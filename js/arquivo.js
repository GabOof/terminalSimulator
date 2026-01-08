// Representação de um arquivo simples
class Arquivo {
  constructor(nome, conteudo = "") {
    this.nome = nome; // Nome do arquivo
    this.conteudo = conteudo; // Conteúdo textual
    this.permissoes = "rwe"; // Permissões padrão
    this.dono = "user"; // Dono padrão
    this.criadoEm = new Date(); // Data de criação
    this.atualizadoEm = new Date(); // Última modificação
  }
}
