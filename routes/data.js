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
    Book.find({$text: {$search: req.query.search}}).then((docs) => {
        const response = {
            data: []
        };
        docs.forEach(doc => {
            response.data.push({
                id: doc._id.toString(),
                name: doc.name,
                description: doc.description,
                owner: doc.owner,
                evaluation: doc.evaluation,
                comments: doc.comments
            })
        })
        res.status(200).send(response);
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
                evaluation: doc.evaluation,
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
    const body = req.body;

    if (body.comment) {
        Book.findOneAndUpdate({_id: req.params.id}, {"$push": {"comments": body.comment}})
            .then(() => res.status(200).send())
            .catch(err => console.log(err));
    } else if (body.evaluation) {
        Book.findOneAndUpdate({_id: req.params.id}, {"evaluation": body.evaluation.value})
            .then(() => res.status(200).send())
            .catch(err => console.log(err));
    } else {
        res.status(500).send();
    }
});

module.exports = router;