const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  eventname: { type: String, required: true },
  professor: { type: String, required: true },
  reason: { type: String, required: true },
  members: { type: String, required: true } ,
  date: {type: Date, required: true },
  summary: {type: String}
  
});

module.exports = mongoose.model('User', EventSchema);
