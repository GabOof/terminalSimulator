// Representação de um arquivo simples
class File {
  constructor(name, content = "") {
    this.name = name; // Nome do arquivo
    this.content = content; // Conteúdo textual
    this.permissions = "rw-"; // Permissões padrão
    this.owner = "user"; // Dono padrão
    this.createdAt = new Date(); // Data de criação
    this.updatedAt = new Date(); // Última modificação
  }
}
