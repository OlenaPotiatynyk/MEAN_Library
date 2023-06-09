const mongoose = require('mongoose');
const fs = require("fs");

const CommentSchema = mongoose.Schema({
        type: [{
            time: {
                type: Date,
                default: Date.now,
            },
            author: {
                type: String,
                require: true
            },
            content: {
                type: String,
                require: true
            },
        }],
        require: true
    })

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
    },
    owner: {
        type: String,
        require: true
    },
    evaluation: {
        type: Number,
        require: false
    },
    comments: CommentSchema
});

FileSchema.index({name: 'text', description: 'text', owner: 'text'});

const FileList = module.exports = mongoose.model('File', FileSchema);

module.exports.addFile = async (newFile, path) => {
    newFile.content = fs.readFileSync(path)
    await FileList.create(newFile);
};