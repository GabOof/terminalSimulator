# Terminal Simulator – Simulador de Sistema de Arquivos

Simulador de sistema de arquivos inspirado em terminais LINUX, desenvolvido com JavaScript, HTML e CSS. Permite a criação, navegação e manipulação de diretórios e arquivos em um ambiente virtual interativo.

---

## Integrantes do Projeto

- Aline Rafaela da Costa Araújo - 0058409
- Felipe Alexandre Vieira Mendes - 0030839
- Gabrielle de Oliveira Fonseca - 0072379
- Gabrielly de Assis Silva - 0105221

## Funcionalidades Principais

### 1. Sistema de Arquivos Virtual Hierárquico

- Diretórios representados por instâncias da classe `Directory`.
- Arquivos representados por instâncias da classe `File`.
- Metadados simulados: permissões, usuário proprietário, timestamps etc.
- Navegação via comandos `cd`, `pwd`, `ls`, `tree`.

### 2. Interpretador Interativo de Comandos

Suporte (inspirado no ambiente LINUX) para:

- `mkdir <nome>`
- `touch <nome>`
- `cd <dir>`, `cd ..`, `cd /`
- `pwd`
- `ls` e `ls -l`
- `cat <arquivo>`
- `echo <texto> > <arquivo>`
- `echo <texto> >> <arquivo>`
- `rm <nome>`
- `rename <antigo> <novo>`
- `tree`
- `history`
- `clear`

### 3. Interface Gráfica Estética e Funcional

- Janela estilo “terminal macOS” com botões RGB.
- Painel lateral exibindo a árvore de diretórios em tempo real.
- Tooltip com descrição dos comandos, acionado apenas ao passar o mouse no ícone de informação.

### 4. Histórico de Comandos

Cada comando executado é registrado em `FileSystem.history` e pode ser exibido via `history`.

---

## 🧠 Arquitetura Interna

### 1. `FileSystem`

Responsável pelo gerenciamento global do sistema de arquivos:

- diretório raiz
- diretório atual
- histórico

### 2. `Directory`

Modela uma pasta contendo:

- subdiretórios (`children`)
- arquivos (`files`)
- metadados (owner, permissions, timestamps)

### 3. `File`

Modela arquivos textuais simples.

### 4. `CommandInterpreter`

Módulo responsável pela análise sintática e semântica dos comandos.
Cada comando tem seu próprio método especializado.

### 5. `main.js`

- Orquestra eventos da UI.
- Atualiza prompt.
- Atualiza a visualização da árvore lateral.
- Imprime saída no terminal.

---

## Como Executar

1. Clone o repositório:

```bash
git clone https://github.com/GabOof/terminalSimulator.git
```

2. Instale a extensão Live Server no VSCode (ou use outro servidor local);

3. Abra o arquivo `index.html`;

4. Clique no ícone do Live Server para iniciar o servidor local;

5. A aplicação abrirá no navegador padrão.
