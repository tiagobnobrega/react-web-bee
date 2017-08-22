#TODO README

##Configuração Webstorm
###Eslint fix command

Para configurar o comando o eslint deve estar instalado de forma global

>npm install eslint -g

Será necessário descobrir o caminho completo de instalacao do eslint

>npm config get prefix

O caminho completo será: "<NPM_PREFIX>\eslint" 

Acessar: File => Settings => Tools => External Tools

Criar um novo commando

<CAMINHO_COMPLETO_ESLINT> "$FilePath$" --fix

* Parameter:
  --fix "$FilePath$"
* Working Directory:
  $ProjectFileDir$

