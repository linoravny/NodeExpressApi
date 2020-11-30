

const express = require('express');
var app = express();

var port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
// support parsing of application type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
// app.use(bodyParser.urlencoded({    
//     extended: true
//   })); 

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
    
    // app.post('/prod', (req, res, next) => {
    //     console.log("Body: ", req.body);
    //     var ProdE = require('./api/models/productModel');
    //     var prod = new ProdE({
    //         name: req.body.name,
    //         email: req.body.email,
    //         type: req.body.type
    //       });
         
    //       prod.save(function(err, result) {
    //         if (err) { 
    //         console.log("err: ", err);
    //           res.send(err);
    //         }
    //         else if(result) {
    //           console.log("result: ", res.json(result));
    //           res.send({success:true});
    //           //res.json(result);
    //         }
    //       });
    // })
});


/**** PORT ****/
  app.listen(port, () => {
    console.log(`Server listening at ${port}`);
});

