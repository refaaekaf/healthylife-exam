const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  activityType: {
    type: String,
    enum: ['olahraga', 'minum_air', 'tidur', 'lainnya'],
    required: true
  },
  value: { type: Number, required: true }, 
  notes: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Activity', activitySchema);