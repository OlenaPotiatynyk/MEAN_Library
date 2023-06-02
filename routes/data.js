const express = require('express');
const Book = require("../models/file");
const router = express.Router();
const fs = require("fs");

router.post('/', async (req, res) => {
    const file = req.files.file;
    const path = req.files.file.name;

    await file.mv('public/' + path, () => {
        Book.addFile({
            name: path,
            description: req.body.description,
            content: file,
            owner: req.body.owner,
        }, 'public/' + path);
        return res.json({success: true});
    });

});

router.get('/', (req, res) => {
    const query = {description: '123'};
    Book.findOne(query).then(docs => {
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
                description: doc.description,
                owner: doc.owner,
                comments: doc.comments
            })
        })
        res.status(200).send(response);
    });
});

router.get('/:id', (req, res) => {
    Book.findById(req.params.id).then((docs) => {
        fs.writeFileSync('public/' + docs.name, docs.content);
        res.download('public/' + docs.name);
    });
});

router.patch('/:id', (req, res) => {
    const comment = req.body;

    Book.findOneAndUpdate({_id: req.params.id}, {"$push": {"comments": comment}})
        .then(() => res.status(200).send())
        .catch(err => console.log(err));
});

module.exports = router;