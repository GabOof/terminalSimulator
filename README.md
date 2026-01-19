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
- Navegação via comandos.

### 2. Interpretador Interativo de Comandos

Suporte (inspirado no ambiente LINUX) para:

- Criação e Manipulação de Diretórios
  - ✅ `mkdir <nome>` — criação de diretório
  - ✅ `rmdir <nome>` — remoção de diretório vazio
  - ✅ `tree` — visualização hierárquica do sistema de arquivos
  - ✅ `rename <nome_antigo> <novo_nome>` — renomeação de arquivo/diretório

- Criação e Manipulação de Arquivos
  - ✅ `touch <nome>` — criação de arquivo vazio
  - ✅ `echo <texto> > <arquivo>` — sobrescrita de conteúdo
  - ✅ `echo <texto> >> <arquivo>` — concatenação de conteúdo
  - ✅ `cat <arquivo>` — exibição do conteúdo
  - ✅ `rm <nome>` — remoção forçada (arquivo ou diretório não vazio)
  - ✅ `head <arquivo> <n>` — primeiras n linhas
  - ✅ `tail <arquivo> <n>` — últimas n linhas
  - ✅ `wc <arquivo>` — contagem de linhas, palavras e caracteres

- Navegação entre Diretórios
  - ✅ `cd <nome>` — navegação relativa
  - ✅ `cd ..` — diretório pai
  - ✅ `cd /` — diretório raiz
  - ✅ `pwd` — caminho absoluto atual

- Busca e Filtragem
  - ❌ `find <diretorio> -name <nome>` — busca recursiva por nome
  - ❌ `grep <termo> <arquivo>` — busca textual em arquivo

- Permissões e Propriedades (Simulação)
  - ❌ `chmod <permissao> <nome>` — permissões (r, w, x)
  - ❌ `chown <proprietario> <nome>` — alteração de proprietário
  - ✅ `ls -l` — listagem detalhada (tipo, tamanho, permissões, dono)

- Informações sobre Arquivos e Diretórios
  - ❌ `stat <nome>` — metadados completos
  - ❌ `du <diretorio>` — tamanho total do diretório (bytes)

- Operações Avançadas
  - ❌ `cp <origem> <destino>` — cópia de arquivos/diretórios
  - ❌ `mv <origem> <destino>` — movimentação
  - ❌ `diff <arquivo1> <arquivo2>` — comparação linha a linha
  - ❌ `zip <arquivo.zip> <itens>` — compactação simulada
  - ❌ `unzip <arquivo.zip>` — descompactação simulada

- Extras
  - ✅ `history` — histórico de comandos executados
  - ✅ `clear` — limpa a tela do terminal

### 3. Interface Gráfica Estética e Funcional

- Janela estilo “terminal macOS” com botões RGB.
- Painel lateral exibindo a árvore de diretórios em tempo real.
- Tooltip com descrição dos comandos, acionado apenas ao passar o mouse no ícone de informação.

### 4. Histórico de Comandos

Cada comando executado é registrado em `FileSystem.history` e pode ser exibido via `history`.

---

## Arquitetura Interna

### 1. `FileSystem`

Responsável pelo gerenciamento global do sistema de arquivos:

- diretório raiz
- diretório atual
- histórico

### 2. `Directory`

Modela uma pasta contendo:

- subdiretórios (`filho`)
- arquivos (`arquivos`)
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
