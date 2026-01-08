class CommandInterpreter {
  constructor(fs) {
    this.fs = fs; // Referência ao sistema de arquivos
  }

  execute(input) {
    this.fs.addHistory(input); // Salvar histórico

    const args = input.trim().split(" ");
    const cmd = args[0];

    switch (cmd) {
      case "mkdir":
        return this.mkdir(args[1]);
      case "touch":
        return this.touch(args[1]);
      case "cd":
        return this.cd(args[1]);
      case "pwd":
        return this.pwd();
      case "ls":
        return this.ls(args[1]);
      case "cat":
        return this.cat(args[1]);
      case "echo":
        return this.echo(input);
      case "rm":
        return this.rm(args[1]);
      case "tree":
        return this.tree(this.fs.current, 0);
      case "rename":
        return this.rename(args[1], args[2]);
      case "history":
        return this.fs.history.join("\n");
      case "clear":
        return "__clear__";

      default:
        return "Comando inválido.";
    }
  }

  mkdir(name) {
    if (!name) return "Uso: mkdir <nome>";
    if (this.fs.current.children[name]) return "Diretório já existe.";

    this.fs.current.children[name] = new Directory(name, this.fs.current);
    return "Diretório criado.";
  }

  touch(name) {
    if (!name) return "Uso: touch <nome>";
    this.fs.current.files[name] = new File(name);
    return "Arquivo criado.";
  }

  cd(name) {
    if (!name || name === "/") {
      this.fs.current = this.fs.root;
      return this.pwd();
    }

    if (name === "..") {
      if (this.fs.current.parent) this.fs.current = this.fs.current.parent;
      return this.pwd();
    }

    if (!this.fs.current.children[name]) return "Diretório inexistente.";

    this.fs.current = this.fs.current.children[name];
    return this.pwd();
  }

  pwd() {
    let dir = this.fs.current;
    if (dir === this.fs.root) return "~";

    let path = dir.name;
    while (dir.parent && dir.parent !== this.fs.root) {
      dir = dir.parent;
      path = dir.name + "/" + path;
    }

    return "~/" + path;
  }

  ls(flag) {
    let out = "";

    if (flag === "-l") {
      for (let d in this.fs.current.children) out += `d rwx ${d}\n`;

      for (let f in this.fs.current.files) out += `f rw- ${f}\n`;

      return out;
    }

    return Object.keys(this.fs.current.children)
      .concat(Object.keys(this.fs.current.files))
      .join("  ");
  }

  cat(name) {
    if (!name) return "Uso: cat <arquivo>";
    if (!this.fs.current.files[name]) return "Arquivo não encontrado.";
    return this.fs.current.files[name].content;
  }

  echo(input) {
    const match = input.match(/echo (.*) >>? (\S+)/);

    if (!match) return "Uso: echo <texto> > <arquivo>";

    let text = match[1];
    let file = match[2];

    if (!this.fs.current.files[file])
      this.fs.current.files[file] = new File(file);

    if (input.includes(">>")) this.fs.current.files[file].content += text;
    else this.fs.current.files[file].content = text;

    return "Conteúdo escrito.";
  }

  rm(name) {
    if (!name) return "Uso: rm <nome>";

    if (this.fs.current.files[name]) {
      delete this.fs.current.files[name];
      return "Arquivo removido.";
    }
    if (this.fs.current.children[name]) {
      delete this.fs.current.children[name];
      return "Diretório removido.";
    }

    return "Nome não encontrado.";
  }

  rename(oldName, newName) {
    if (!oldName || !newName) return "Uso: rename <antigo> <novo>";

    if (this.fs.current.files[oldName]) {
      this.fs.current.files[newName] = this.fs.current.files[oldName];
      this.fs.current.files[newName].name = newName;
      delete this.fs.current.files[oldName];
      return "Arquivo renomeado.";
    }

    if (this.fs.current.children[oldName]) {
      this.fs.current.children[newName] = this.fs.current.children[oldName];
      this.fs.current.children[newName].name = newName;
      delete this.fs.current.children[oldName];
      return "Diretório renomeado.";
    }

    return "Nada encontrado.";
  }

  tree(dir, level) {
    let out = `${" ".repeat(level * 2)}- ${dir.name}\n`;

    for (let d in dir.children) out += this.tree(dir.children[d], level + 1);

    for (let f in dir.files) out += `${" ".repeat((level + 1) * 2)}* ${f}\n`;

    return out;
  }
}
