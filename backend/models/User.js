const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  savedArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }],
  dailyGoals: {
    water: { type: Number, default: 8 },      
    exercise: { type: Number, default: 30 },  
    sleep: { type: Number, default: 8 }       
  },
  streak: {
    current: { type: Number, default: 0 },
    longest: { type: Number, default: 0 },
    lastActiveDate: { type: Date }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);