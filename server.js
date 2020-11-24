

const express = require('express');
var app = express();

var port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**** ROUTE ****/
var routes = require('./api/routes/productRoutes'); //importing route
routes(app); //register the route


/**** mongoose connect to Atlas DB ****/
const mongoose = require('mongoose');
const uri = "mongodb+srv://linoravny:apiapi123@cluster0.ps0o2.azure.mongodb.net/testAppUsersDB?retryWrites=true&w=majority";

let opts = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true };

mongoose.connect(uri, opts);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

/**** PORT ****/
  app.listen(port, () => {
    console.log(`Server listening at ${port}`);
});

