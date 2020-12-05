'use strict';
module.exports = function(app) {
  var productCont = require('../controllers/productController');

  const cors = require('cors');
  var corsOptions = {
      origin: '*',
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      allowedHeaders: 'Access-Control-Allow-Origin,Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'//,
      //methods: 'GET, POST, PUT, DELETE, OPTIONS',
      //exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
      //credentials: true
    }
  app.use(cors(corsOptions));

  // todoList Routes
  app.route('/getProducts')
    .get(productCont.get_all_products);

  app.route('/addProduct')
    .post(productCont.add_product, (req, res, next) => {
      //console.log("router path:/addProduct sucess");
      //res.send({success:true});
    });

  app.route('/editProduct')
      .put(productCont.update_product);

  app.route('/deleteProduct')
      .post(productCont.delete_product, (req, res, next) => {
          //console.log("Body: ", req.body);
          //res.send(JSON.stringify(req.body));
        });

};