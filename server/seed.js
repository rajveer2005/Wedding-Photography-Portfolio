// Fills the database with starter content. Run: npm run seed
// Photos are yours (client/public/images). Films are 3-minute sample videos made from your photos - replace them from /admin.
require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const mongoose = require('mongoose');
const Media = require('./models/Media');
const L = (n) => `/images/${n}.jpg`;
const V = (n) => `/videos/${n}.mp4`;  // 3-minute sample films built from your photos (client/public/videos)
const data = [
  ...['portrait-purple', 'portrait-pillar'].map((n, i) => ({ section: 'hero', url: L(n), order: i })),
  ...['bw-2', 'bride-1', 'bw-1', 'bride-2', 'bw-3', 'portrait-purple', 'bw-4', 'bride-3', 'portrait-pillar', 'bw-6', 'bw-5', 'bw-7', 'bride-4', 'bw-8', 'bw-9', 'bride-5']
    .map((n, i) => ({ section: 'portfolio', url: L(n), order: i })),
  { section: 'featured', url: L('bride-3'), title: 'Sonali', caption: 'Bride story · 2026', order: 0 },
  { section: 'featured', url: L('portrait-pillar'), title: 'Traditional portraits', caption: 'Pune', order: 1 },
  { section: 'featured', url: L('portrait-purple'), title: 'Sonali', caption: 'Portrait collection', order: 2 },
  { section: 'films', type: 'video', url: V('film-1'), title: 'Wedding Film 1', caption: 'Sample film - replace from admin', order: 0 },
  { section: 'films', type: 'video', url: V('film-2'), title: 'Wedding Film 2', caption: 'Sample film - replace from admin', order: 1 },
  { section: 'films', type: 'video', url: V('film-3'), title: 'Wedding Film 3', caption: 'Sample film - replace from admin', order: 2 }
];
(async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not set. Copy server/.env.example to server/.env and set the MongoDB connection string.');
  }
  await mongoose.connect(process.env.MONGO_URI);
  await Media.deleteMany({});
  await Media.insertMany(data);
  console.log('Seeded', data.length, 'items');
})()
  .catch((e) => {
    console.error('Seed error:', e.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
