# Inteli - Instituto de Tecnologia e Liderança 

<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="/imagens/inteli.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0"></a>
</p>

# Nome do projeto: Dendem

## Nome do grupo: ECOmigo

## :student: Integrantes: 
- <a href="https://www.linkedin.com/in/antoniobfm/">Antônio Bahia Fonseca Moraes</a>
- <a href="https://www.linkedin.com/in/cec%C3%ADlia-alonso-gon%C3%A7alves-3aa4bb271/">Cecília Gio Alonso Gonçalves</a>
- <a href="https://www.linkedin.com/in/felipe-braga-69607126a/">Felipe Morita de Almeida Braga</a>
- <a href="https://www.linkedin.com/in/jo%C3%A3o-pedro-brand%C3%A3o-de-moura-338636215/">João Pedro Brandão de Moura</a> 
- <a href="https://www.linkedin.com/in/laura-padilha-bueno-b358419a/">Laura Padilha Bueno</a>
- <a href="https://www.linkedin.com/in/luigi-ot%C3%A1vio-904475234/">Luigi Otávio Neves Macedo</a> 
- <a href="https://www.linkedin.com/in/raideoliveira/">Raí de Oliveira Cajé</a>

## :teacher: Professores:
### Orientador(a) 
- <a href="https://www.linkedin.com/in/juliastateri/">Julia Stateri</a>
### Instrutores
- <a href="https://www.linkedin.com/in/victorbarq/">Nome do integrante 2</a>
- <a href="https://www.linkedin.com/in/victorbarq/">Nome do integrante 3</a> 
- <a href="https://www.linkedin.com/in/victorbarq/">Nome do integrante 4</a> 
- <a href="https://www.linkedin.com/in/victorbarq/">Nome do integrante 5</a>
- <a href="https://www.linkedin.com/in/victorbarq/">Nome do integrante 6</a> 
- <a href="https://www.linkedin.com/in/victorbarq/">Nome do integrante 7</a>

## 📝 Descrição

O “Dendem” é uma aplicação web que funciona como ferramenta facilitadora da colaboração entre pesquisadores da Natura e agricultores associados a fim de pesquisas para o desenvolvimento de produtos da empresa. Com o Dendem, pesquisadores podem criar protocolos, os quais guiam os agricultores no processo de coleta de imagens e dados das espécies vegetais solicitadas. Os agricultores, então, atuam como coletores utilizando a aplicação através de seu próprio smartphone, podendo capturar fotos e inserir informações demandadas da própria palma da mão. Essas funcionalidades são favorecidas, ainda, pela opção de preenchimento de protocolos de modo offline, com a possibilidade de sincronização online quando houver rede disponível. Além disso, o Dendem também conta com a possibilidade de acesso coletivo a protocolos por pesquisadores, o que favorece o compartilhamento de conhecimento dentro do setor de pesquisa da Natura.

## 📝 LINK

Clique <a href="https://www.linkedin.com/in/victorbarq/">AQUI</a> para ver o projeto funcionando.

## 📁 Estrutura de pastas

|--> backend<br>
  &emsp;| --> src <br>
|--> documentacao<br>
  &emsp;| --> inteli.png <br>
|--> documentos<br>
  &emsp;|--> WAD - Documento Aplicação Web - ECOmigo.pdf<br>
|--> frontend<br>
  &emsp;| --> frontend<br>
  &emsp;| --> src</br>
  &emsp;| --> public</br>
|--> modelosrelacionais</br>
  &emsp;| --> mfisico.db</br>
  &emsp;| --> mfisico;sqbpro</br>
|--> .gitignore</br>
|--> LICENSE</br>
| Projeto2 - Shortcut.lnk</br>
| README.md</br>

Dentre os arquivos presentes na raiz do projeto, definem-se:

- <b>readme.md</b>: arquivo que serve como guia e explicação geral sobre o projeto (o mesmo que você está lendo agora).

- <b>documentos</b>: aqui estarão todos os documentos do projeto. Há também uma pasta denominada <b>outros</b> onde estão presentes aqueles documentos complementares ao <b>web application document</b>.

- <b>imagens</b>: imagens relacionadas ao projeto como um todo (por exemplo imagens do sistema, do grupo, logotipos e afins).

- <b>src</b>: nesta pasta encontra-se todo o código fonte do sistema (existem duas subpastas <b>backend</b> e <b>frontend</b> que contêm, respectivamente, o código do servidor e o código da página web).

## 💻 Configuração para desenvolvimento

Aqui encontram-se todas as instruções necessárias para a instalação de todos os programas, bibliotecas e ferramentas imprescindíveis para a configuração do ambiente de desenvolvimento.

1.  Baixar e instalar o node.js:  [https://nodejs.org/pt-br/](https://nodejs.org/pt-br/) (versão 16.15.1 LTS)
2. Clone o repositório em questão.
3.  No modo administrador, abra o "prompt de comando" ou o "terminal" e, após,  abra a pasta "src/backend" no diretório raiz do repositório clonado e digite o segundo comando:

```sh
npm install
```

Isso instalará todas as dependências definidas no arquivo <b>package.json</b> que são necessárias para rodar o projeto. Agora o projeto já está pronto para ser modificado. Caso ainda deseje iniciar a aplicação, digite o comando abaixo no terminal:

```sh
npm start
```
5. Agora você pode acessar a aplicação através do link http://localhost:1234/
6. O servidor está online.


```
Alunos inteli (remover essa observação do readme.md após leitura e execução):

1. Certifique-se que há um arquivo "package.json" na pasta backend do projeto.

2. Dentro deste arquivo, encontre a propriedade "scripts", e adicione um atributo de nome "start"
com o valor "node <CAMINHO_DO_ARQUIVO_DO_SERVIDOR>." Atenção: "<CAMINHO_DO_ARQUIVO_DO_SERVIDOR>" 
deve ser substituído pelo caminho para o arquivo principal da aplicação, utilizado para subir o
servidor. Por exemplo, se o arquivo utilizado para subir o servidor é "app.js", o atributo start
deve possuir o valor "node app.js".

3. No arquivo utilizado para subir a aplicação, defina a porta padrão de execução para "1234".
````

## 🗃 Histórico de lançamentos

### Commits on 15/05/2023 by RaiDeOliveira
- Updated README.md, da05d82ce9f4eca8651ce7752107497de73f31b2
- Updated README.md, 5cb3889062352941259fbd04bff34f6965dccd12

### Commits on 13/05/2023 by RaiDeOliveira
- Atualização do WAD e do backend, e1cebcb288a94bc62baf802d5b15328974235e93

### Commits on 12/05/2023 by RaiDeOliveira
- Updated README.md, 004b6d2d6f465f1ae791b33f3c0ee7cec0a2a4ac

### Commits 10/05/2023 
- cecigonca: Merged pull request #3 from antoniobfm/main, 70e202879f3a4d6532a3e45f80d4aa43e626ac2f
- antoniobfm: Separated usecases from controllers, 96dafd1ebd468cf2d5c48d77106a543cde99161a
- cecigonca: Merged pull request #2 from antoniobfm/main, 49e8ac1cb9a61149b1dcaf7779b24ab9973015a9
- antoniobfm: Organized project structure, connected routes and fixed errors, 5e98392100e9d1fee2d44a7f1ac5421b91fa8942

### Commits 09/052023
- cecigonca: Merged pull request #1 from otavioluigi07/LuigiOtavio, 902aa310641ca08a9253400cbee58b76137ecbda
- otavioluigi07: primeirocomitt_backend, bf1674a1a453ad8923abf3a6c4f9564795452dc5

### Commits on 08/05/2023 by RaiDeOliveira
- Updated README.md (multiple times), b72ed4c0060a848c5cc6882d317e7bd4be311687 (last one of the sequence)
- cecigonca: modelo físico (versão 1), a3698b4e336771e90ef912fc7276f06fdbd80391

### Commits on 02/05/2023 by RaiDeOliveira
- Merged branch 'main' of https://github.com/2023M2T7-Inteli/Projeto2, 2907f99abf63d7666620e748ae32e07f242704cc
- att nome arquivo WAD, da0047107e719f02f4ab17972406e67aad1c64b1
- Updated README.md (multiple times), aba478fcbfa167aeba504589c2fb7afbab50a1a2
- Upload WAD, 7a61bfcdb392af2ecb62569cebceea15b4af4d58

## 📋 Licença/License
```
Alunos inteli (remover essa observação do readme.md após leitura e execução, junto com o link para o tutorial):

1. Siga o tutorial para criação da licença: 
```

<a href="https://drive.google.com/file/d/1hXWLHUhjBkPVuGqeE2LZKozFntnJZzlx/view">Tutorial</a>

<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/Intelihub/Template_M2/">MODELO GIT INTELI</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.yggbrasil.com.br/vr">Inteli, Nome do integrante 1, Nome do integrante 2, Nome do integrante 3, Nome do integrante 4, Nome do integrante 5, Nome do integrante 6, Nome do integrante 7</a> is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International</a>.</p>

