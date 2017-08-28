#TODO README

##Configuração npm

###Definir padrões globais

//Não criar package-lock<br/>
npm config set package-lock false

##Configuração Webstorm
###Eslint fix command

Para configurar o comando o eslint deve estar instalado de forma global

>npm install eslint -g

Será necessário descobrir o caminho completo de instalacao do eslint

>npm config get prefix

O caminho completo será: "<NPM_PREFIX>\eslint"
 
No windows por exemplo: "C:\Program Files\nodejs\eslint.cmd"

Acessar: File => Settings => Tools => External Tools

Criar um novo commando

<CAMINHO_COMPLETO_ESLINT> "$FilePath$" --fix

* Parameter:
  --fix "$FilePath$"
* Working Directory:
  $ProjectFileDir$
  
Para facilitar o desenvolvimento, registr um keymap:

Acessar: File => Settings => Keymap

1. Ecnontrar o comando criado em "External Tools"
1. Adcionar atalho de teclado




