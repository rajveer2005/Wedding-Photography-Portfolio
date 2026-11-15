const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const Media = require('../models/Media');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const typeOf = (f) => (f.mimetype.startsWith('video/') ? 'video' : 'image');
const removeFile = (url) => {
  if (url && url.startsWith('/uploads/')) fs.unlink(path.join(__dirname, '..', url), () => {});
};

// PUBLIC: everything for the website
router.get('/', async (req, res) => {
  res.json(await Media.find().sort({ section: 1, order: 1, createdAt: -1 }));
});

// ADMIN: add files (or paste an image URL)
router.post('/', auth, upload.array('files', 20), async (req, res) => {
  const { section, title = '', caption = '', url } = req.body;
  const items = (req.files || []).map((f) => ({ section, title, caption, type: typeOf(f), url: '/uploads/' + f.filename }));
  if (url) items.push({ section, title, caption, type: /\.(mp4|webm|mov)$/i.test(url) ? 'video' : 'image', url });
  res.status(201).json(await Media.insertMany(items));
});

// ADMIN: edit text/order, or REPLACE the file
router.put('/:id', auth, upload.single('file'), async (req, res) => {
  const doc = await Media.findById(req.params.id);
  if (!doc) return res.status(404).json({ error: 'Not found' });
  ['title', 'caption', 'section', 'order'].forEach((k) => { if (req.body[k] !== undefined) doc[k] = req.body[k]; });
  if (req.file) { removeFile(doc.url); doc.url = '/uploads/' + req.file.filename; doc.type = typeOf(req.file); }
  else if (req.body.url) { removeFile(doc.url); doc.url = req.body.url; doc.type = /\.(mp4|webm|mov)(\?.*)?$/i.test(req.body.url) ? 'video' : 'image'; }
  res.json(await doc.save());
});

// ADMIN: delete
router.delete('/:id', auth, async (req, res) => {
  const doc = await Media.findByIdAndDelete(req.params.id);
  if (doc) removeFile(doc.url);
  res.json({ ok: true });
});

module.exports = router;
