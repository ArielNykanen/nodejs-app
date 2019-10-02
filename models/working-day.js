const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  date: {
    type: String,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  startTime: {
    type: String
  },
  endTime: {
    type: String
  },
  totalWorkTime: {
    type: Number 
  },
  totalHourlyPaid: {
    type: Number
  },
  tips: {
    type: Number
  },
  expenses: [
    {
      expens: String,
      desc: String
    }
  ],
  brakeTime: {
    type: Number
  },
  totalCash: {
    type: Number
  },

  userId: {
    type: Schema.Types.ObjectId,
    // relation setup to user model
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Working-day', userSchema);