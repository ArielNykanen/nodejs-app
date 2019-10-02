const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  sallaryPerHour: {
    type: String,
    required: true
  },
  workDays: [
      // {
      //   workStart: { type: String, required: true },
      //   workEnd: { type: String, required: true },
      //   tips: { type: String, required: true },
      // }
  ],

  deliveris: [
    {
      streetName: { type: String },
      deliveryPrice: { type: String }
    }
  ],
  
  authToken: {
    type: String,
  },
  role: String
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);