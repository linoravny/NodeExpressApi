'use strict';

const mongoose = require('mongoose');

var ProductSchema  = new mongoose.Schema({
 name: {
    type: String,
    required: 'Enter name'
  },
  email: {
    type: String,
    required: 'Enter email'
  },
  type: {
    type: String
  }
});

module.exports = mongoose.model('Product', ProductSchema );