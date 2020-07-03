# Aluno UPE Service

### Como gerar a biblioteca:

ng new projeto-angular --create-application=false
ng g library nome-biblioteca

### Compilando a biblioteca:

ng build nome-biblioteca --prod
ng lint nome-biblioteca

### Liberando biblioteca pro NPM:

npm publish @rebase-team/nome-biblioteca --access public

### Instalando a biblioteca:

npm install --save @rebase-team/nome-biblioteca
