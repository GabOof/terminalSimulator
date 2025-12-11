// Instâncias
const fs = new FileSystem();
const interpreter = new CommandInterpreter(fs);
const prompt = document.querySelector(".prompt");

// DOM
const input = document.getElementById("commandInput");
const output = document.getElementById("output");
const sidebarTree = document.getElementById("sidebarTree");

// Printar no terminal
function print(msg) {
  output.innerText += msg + "\n";
  output.scrollTop = output.scrollHeight;
}

// Gerar representação da árvore para a sidebar
function generateTree(dir, level = 0) {
  let result = `${" ".repeat(level * 2)}- ${dir.name}\n`;

  for (let d in dir.children)
    result += generateTree(dir.children[d], level + 1);

  for (let f in dir.files) result += `${" ".repeat((level + 1) * 2)}* ${f}\n`;

  return result;
}

// Atualizar painel lateral
function updateSidebar() {
  sidebarTree.innerText = generateTree(fs.root, 0);
}

function updatePrompt() {
  prompt.innerText = interpreter.pwd() + " $";
}

// Input listener
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const cmd = input.value;

    print(`${interpreter.pwd()} $ ${cmd}`);

    const result = interpreter.execute(cmd);

    if (result === "__clear__") {
      output.innerText = "";
      print(interpreter.pwd() + " $");
      input.value = "";
      return;
    }

    if (result !== undefined && result !== null) {
      print(result);
    }

    input.value = "";

    updateSidebar(); // sempre atualizar após qualquer comando
    updatePrompt(); // atualizar prompt
  }
});

// Atualiza ao carregar
updateSidebar();
updatePrompt();
