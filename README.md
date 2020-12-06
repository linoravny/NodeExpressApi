# CRUD, Node JS Express and MongoDB
## with JS vanilla + Angular

## required install:
    1. Node JS : https://nodejs.org/en/download/

### get started:
    1. mongoDB: 
        1.1. create user + password <password> - https://account.mongodb.com/account/login
        1.2. login to mongo atlas
        1.3. create DB <dbname> (cluster->collection->create db btn) 
        1.4. create collection name:"products"
        1.5. copy your connection string from:
            - right menu -> click "Cluster" -> click "connect" btn -> popup will open
            - click "connect with your application" -> copy the "const uri = ...."
            - uri need to be like this: const uri = "mongodb+srv://linoravny:<password>@cluster0.ps0o2.azure.mongodb.net/<dbname>?retryWrites=true&w=majority";
            -  <password> => change to your passweord , <dbname> - the db name that you create in section 1.2.

    2. this project
        2.1. open server.js file
        2.2. change the uri to your copy uri from section 1.5
        2.3. open cmd in the root
        2.4. run -> $ npm install

### run project 
## server node JS in the root 
    - $ npm run start;  (http://localhost:3000/)
## desctopVanilla client
    - run index.html in desktopVanilla/index.html (right click   on index html + copy path -> then run in chrome)
## angular
 - only first time -> $ npm install; for install node_modules folder
 - $ ng serve -o; (http://localhost:4200/)
