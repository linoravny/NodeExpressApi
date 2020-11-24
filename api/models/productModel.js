'use strict';

const mongoose = require('mongoose');

var ProductSchema  = new mongoose.Schema({
 name: {
    type: String
  }
});

module.exports = mongoose.model('Product', ProductSchema );