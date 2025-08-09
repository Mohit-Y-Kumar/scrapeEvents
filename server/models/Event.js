const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  location: { type: String, default: "" },
  category: { type: String, default: "" },
  paidStatus: { type: String, default: "" },
  dateTime: { type: String, default: "" },
  description: { type: String, default: "" },
  imageUrl: { type: String, default: "" }
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
