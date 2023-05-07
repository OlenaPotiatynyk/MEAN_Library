const express = require('express');
const Book = require("../models/file");
const router = express.Router();
const fs = require("fs");

router.post('/', async (req, res) => {
    const file = req.files.file;
    const path = req.files.file.name;

    await file.mv('public/' + path, (err, success) => {
        Book.addFile({
            name: path,
            description: req.body.description,
            content: file
        }, 'public/' + path);
        return res.json({success: true});
    });

});

router.get('/', (req, res) => {
    const query = {description: '123'};
    Book.findOne(query).then((docs) => {
        fs.writeFileSync('public/' + docs.name, docs.content);
        res.download('public/' + docs.name);
    });
});

router.get('/info', (req, res) => {
    Book.find().then((docs) => {
        const response = {
            data: []
        };
        docs.forEach(doc => {
            response.data.push({
                id: doc._id.toString(),
                name: doc.name,
                description: doc.description
            })
        })
        res.status(200).send(response);
    });
});

router.get('/:id', async (req, res) => {
    await Book.findById(req.params.id).then((docs) => {
        fs.writeFileSync('public/' + docs.name, docs.content);
        res.download('public/' + docs.name);
    });
});

module.exports = router;