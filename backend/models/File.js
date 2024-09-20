const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    code: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('File', FileSchema);
