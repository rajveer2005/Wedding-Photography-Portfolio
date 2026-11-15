require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/media', require('./routes/media'));
app.use((err, req, res, next) => res.status(400).json({ error: err.message }));

// Production: serve the built React site
const dist = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(dist));
app.get('*', (req, res, next) => (req.path.startsWith('/api') ? next() : res.sendFile(path.join(dist, 'index.html'), (e) => e && next())));

connectDB().then(() => app.listen(process.env.PORT || 5000, () => console.log('Server on http://localhost:' + (process.env.PORT || 5000))))
  .catch((e) => { console.error('DB error:', e.message); process.exit(1); });
