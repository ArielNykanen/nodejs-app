const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dateSchema = new Schema({
  month: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Date', dateSchema);