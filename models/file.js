const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const {BSON, Binary} = require("bson");
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

module.exports.addFile = async (newFile, path, callback) => {
    // newFile.content = BSON.deserialize(newFile.content.data);
    newFile.content = fs.readFileSync(path)
    await Book.create(newFile);

};