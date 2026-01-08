// Classe que representa um diretório
class Diretorio {
  constructor(nome, pai = null) {
    this.nome = nome; // Nome do diretório
    this.pai = pai; // Referência ao diretório pai
    this.filho = {}; // Subdiretórios
    this.arquivos = {}; // Arquivos
    this.permissoes = "rwx"; // Permissões simuladas
    this.dono = "user"; // Dono padrão
    this.criadoEm = new Date(); // Data de criação
  }
}
