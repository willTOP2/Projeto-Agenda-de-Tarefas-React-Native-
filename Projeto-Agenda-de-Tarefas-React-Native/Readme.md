
---------- Backend da aplicação ---------------------

Exexcutar pasta Backend com o comando:  
    -> npm i para instalar as dependências
     
Depois: 
  -> npm start para excecutar o backend 
  
----------------   Frontend da aplicação---------------
 
Depois executara pasta tasks2020 onde se encontra o Frontend da aplicaçao 
  -> npm i para instalar as dependências
 
Depois: 
  -> executar o react-native run-android 
  
  
  obs: Nesse projeto utilizei o postgres, junto com a biblioteca knex, tanto 
  para o login e para o CRUD (Falta algumas implementação no backend)

--- Importante ---- 
Caso de erro no bundler ( tipo Unable to load script from assets ‘index.android.bundle’), fazer esse procedimento abaixo:

-> Editar o arquivo do projeto node_modules\metro-config\src\defaults\blacklist.js

Substituir neste arquivo:

var sharedBlacklist = [

/node_modules[/\\]react[/\\]dist[/\\].*/,

/website\/node_modules\/.*/,

/heapCapture\/bundle\.js/,

/.*\/__tests__\/.*/

];



-> por isso:

var sharedBlacklist = [

/node_modules[\/\\]react[\/\\]dist[\/\\].*/,

/website\/node_modules\/.*/,

/heapCapture\/bundle\.js/,

/.*\/__tests__\/.*/

];
