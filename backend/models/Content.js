const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['artikel', 'video', 'infografis'], required: true },
  category: {
    type: String,
    enum: ['pola_hidup_sehat', 'gizi_seimbang', 'olahraga', 'kesehatan_mental', 'pencegahan_penyakit'],
    required: true
  },
  body: { type: String, required: true }, 
  description: { type: String }, 
  thumbnailUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Content', contentSchema);