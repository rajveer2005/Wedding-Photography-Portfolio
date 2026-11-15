const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + Math.random().toString(36).slice(2, 7) + path.extname(file.originalname).toLowerCase())
});
const fileFilter = (req, file, cb) =>
  /^(image|video)\//.test(file.mimetype) ? cb(null, true) : cb(new Error('Only images and videos allowed'));
module.exports = multer({ storage, fileFilter, limits: { fileSize: 200 * 1024 * 1024 } });
