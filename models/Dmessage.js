const mongoose = require('mongoose');

const DmessageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  dismessage: {
    type: String,
    required: true,
  },
  expireAt: {
    type: Date,
    default: Date.now(),
  },
});

const Dmessage = mongoose.model('Dmessage', DmessageSchema);

module.exports = Dmessage;
