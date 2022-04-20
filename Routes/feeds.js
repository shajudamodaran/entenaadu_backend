var express = require('express');
const {LSG} =require('../Mongo/DAOs');

var router = express.Router();

router.get('/', async function (req, res) {

    let { lsg } = req.body

    const query = { "_id": lsg };
    const options = {
        "projection": { feeds: 1, _id:0 }
    };

    const result = await LSG.findOne(query, options)

    res.send(result)


});
router.post('/', function (req, res) {
    res.send('POST route on feeds.');
});

//export this router to use in our index.js
module.exports = router;