const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    const uploadPath = path.resolve(__dirname, '../../../client/public/assets/images/artworks');
    cb(null, uploadPath);
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage }).single('file');

const addArtwork = async (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return next(err);
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    return res.status(201).json({ filePath: `/artworks/${req.file.filename}` });
  });
};

module.exports = {
  addArtwork,
};
