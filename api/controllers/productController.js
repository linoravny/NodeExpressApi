'use strict';

let Product = require('../models/productModel');

exports.get_all_products = function(req, res) {
    //const query = { name: "linor" };
    Product.find({}, (error, result) => {
        if (error)
          res.send(error);
        res.json(result);
    });
};

exports.add_product = function(req, res) {
  Product.save(function(err, result) {
    if (err) { 
      res.send(err);
    }
    else if(result) {
     res.json(result)
    }
  });
};


exports.update_product = function(req, res) {
  Product.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, result) {
    if (err)
      res.send(err);
    res.json(result);
  });
};


exports.delete_product = function(req, res) {
    Product.remove({
      _id: req.params.id
    }, function(err, user) {
      if (err)
        res.send(err);
      res.json({ message: 'delete_product successfully' });
    });
};