// Classe que representa um diretório
class Directory {
  constructor(name, parent = null) {
    this.name = name; // Nome do diretório
    this.parent = parent; // Referência ao diretório pai
    this.children = {}; // Subdiretórios
    this.files = {}; // Arquivos
    this.permissions = "rwx"; // Permissões simuladas
    this.owner = "user"; // Dono padrão
    this.createdAt = new Date(); // Data de criação
  }
}
