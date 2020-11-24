'use strict';

const mongoose = require('mongoose');

var UserSchema  = new mongoose.Schema({
  // _id: {
//   type:BSONType
  // },
 first_name: {
    type: String,
    required: 'Enter first name'
  },
  last_name: {
    type: String,
    required: 'Enter last name'
  },
  email: {
    type: String
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String
   /* type: [{
      type: String,
      enum: ['regular', 'express', 'admin']
    }],
    default: ['regular']*/
  }
});

module.exports = mongoose.model('User', UserSchema );