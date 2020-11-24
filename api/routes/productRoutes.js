'use strict';
module.exports = function(app) {
  var prosuctCont = require('../controllers/productController');

  // const cors = require('cors');
  // var corsOptions = {
  //     origin: '*',
  //     methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  //     allowedHeaders: 'Access-Control-Allow-Origin,Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'//,
  //     //methods: 'GET, POST, PUT, DELETE, OPTIONS',
  //     //exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
  //     //credentials: true
  //   }
  // app.use(cors(corsOptions));


// Add headers
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Content-Type", "application/json");
//     res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
//     next();
// });

  // todoList Routes
  app.route('/getProducts')
    .get(prosuctCont.get_all_products);

  app.route('/setProduct')
    .post(prosuctCont.add_product, (req, res) => {
      console.log(res);
    });

app.route('/editProduct')
    .put(prosuctCont.update_product);

app.route('/deleteProduct')
    .delete(prosuctCont.delete_product);

    // app.listen(null, function () {
    //   console.log('CORS-enabled web server listening on port 80')
    // });
};