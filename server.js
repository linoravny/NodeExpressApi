const express = require('express');
var app = express();
var port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Task = require('./api/models/testAppModel').default; //created model loading here
const bodyParser = require('body-parser');
  
// mongoose instance connection url connection
const MONGO_URI = 'mongodb://localhost:27017/RestApiTestdb';
mongoose.Promise = global.Promise;
mongoose
.connect(MONGO_URI, {
useUnifiedTopology: true,
useNewUrlParser: true,
})
.then(() => console.log('DB Connected!'))
.catch(err => {
    console.log('DB Connected Error: ' + err);
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/testAppRoutes'); //importing route
routes(app); //register the route


app.listen(port);

console.log('todo list RESTful API server started on: ' + port);