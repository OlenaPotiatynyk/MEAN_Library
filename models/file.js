const mongoose = require('mongoose');
const fs = require("fs");

const FileSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    content: {
        type: Buffer,
        require: true
    }
});

const Book = module.exports = mongoose.model('File', FileSchema);

module.exports.addFile = async (newFile, path) => {
    newFile.content = fs.readFileSync(path)
    await Book.create(newFile);
};