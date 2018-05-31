'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Car Schema
 */
var CarSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  brand: {
    type: String,
    default: '',
    trim: true,
    required: 'Brand cannot be blank'
  },
  model: {
    type: String,
    default: '',
    trim: true,
    required: 'Model cannot be blank'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Car', CarSchema);
