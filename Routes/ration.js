var express = require('express');
const { ObjectId } = require('mongodb');
const {RationShopes,RationItems} =require('../Mongo/DAOs');

var router = express.Router();

router.get('/', async function (req, res) {

    let { lsg, rationShopId } = req.body

    const query = { "lsg": lsg, "_id":new ObjectId(rationShopId) };

    const result = await RationShopes.findOne(query)

    res.send({data:result})


});


router.post('/', function (req, res) {
    res.send('POST route on feeds.');
});

//export this router to use in our index.js
module.exports = router;