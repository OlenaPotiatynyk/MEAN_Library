const express = require('express');
const router = express.Router();

// router.get('/reg', (req, res) => {
//     res.send('Registration page');
// });

router.post('/upload', (req, res) => {
    const file = req.files.image;

    file.mv(file.name, (err, success) => {
        return res.json({ success: true });
    });
});

router.get('/', (req, res) => {
    res.send('list of files');
});

module.exports = router;