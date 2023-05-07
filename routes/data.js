const express = require('express');
const Book = require("../models/file");
const {serialize, deserialize} = require("v8")
const router = express.Router();
const fs = require("fs");
// router.get('/reg', (req, res) => {
//     res.send('Registration page');
// });

router.post('/', async (req, res) => {
    const file = req.files.file;
    const path = req.files.file.name;

    await file.mv('public/' + path, (err, success) => {
        const newFile = Book.addFile({
            name: path,
            description: req.body.description,
            content: file
        }, 'public/' + path);
        return res.json({success: true});
    });

});

router.get('/', (req, res) => {
    const query = {description: '123'};
    let findOne = Book.findOne(query).then((docs) => {
        fs.writeFileSync('public/' + docs.name, docs.content);
        res.download('public/' + docs.name);
    });
});

module.exports = router;