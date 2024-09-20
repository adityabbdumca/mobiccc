const express = require('express');
const multer = require('multer');
const File = require('../models/File');
const auth = require('../middleware/auth');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });

// Upload File
router.post('/upload', auth, upload.single('file'), async (req, res) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const file = new File({ filename: req.file.filename, code, userId: req.user.id });
    await file.save();
    res.json({ code });
});

// List Files
router.get('/', auth, async (req, res) => {
    const files = await File.find({ userId: req.user.id });
    res.json(files);
});

// Delete File
router.delete('/:id', auth, async (req, res) => {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).send('File not found');

    await file.remove();
    fs.unlinkSync(path.join(__dirname, '../uploads/', file.filename));
    res.send('File removed');
});

// Download File
router.get('/download/:id/:code', auth, async (req, res) => {
    const file = await File.findById(req.params.id);
    if (!file || file.code !== req.params.code) return res.status(400).send('Invalid code');

    res.download(path.join(__dirname, '../uploads/', file.filename));
});

module.exports = router;
