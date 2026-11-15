// One document per photo/video shown on the website.
const mongoose = require('mongoose');
const MediaSchema = new mongoose.Schema({
  section: { type: String, enum: ['hero', 'portfolio', 'featured', 'films', 'live'], required: true },
  type: { type: String, enum: ['image', 'video'], default: 'image' },
  url: { type: String, required: true },      // /uploads/xxx.jpg, /images/xxx.jpg or any https URL
  title: { type: String, default: '' },
  caption: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { timestamps: true });
module.exports = mongoose.model('Media', MediaSchema);
