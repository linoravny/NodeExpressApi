'use strict';

let Product = require('../models/productModel');

exports.get_all_products = function(req, res) {
    //console.log('get_all_products request =' + JSON.stringify(req.body));
    //const query = { name: "linor" };

    Product.find({}, (error, result) => {
        if (error)
          res.send(error);

        console.log('get_all_products result =' + result);
        res.json(result);
    });
};

exports.add_product = function(req, res) {
  console.log('add_product request =' + JSON.stringify(req.body));

  const prod = new Product({
    name: req.body.name,
    email: req.body.email,
    type: req.body.type
  });

  Product.create(prod, function(err, result) {
    if (err) 
      throw err;

    console.log("add_product() result:" + result);
    res.json(result);
  });
};

exports.update_product = function(req, res) {

  console.log('update_product request =' + JSON.stringify(req.body));
  console.log("update_product id: "+ req.body.id);

  const filter = {_id: req.body.id};
  const updateDoc = {
    $set: {
      name:req.body.name,
      email:req.body.email,
      type:req.body.type
    }
  };

  Product.updateOne(filter, updateDoc, function(err, result) {
    if (err)
      res.send(err);
    console.log("update_product result: "+ result);
    res.json(result);
  });
};

exports.delete_product = function(req, res) {
  console.log('delete_product request =' + req.body);

  Product.deleteOne({
      _id: req.body.id
    }, function(err, user) {
      if (err)
        res.send(err);
      res.json({ message: 'delete_product successfully' });
    });
};