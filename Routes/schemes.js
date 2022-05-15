var express = require('express');
const { ObjectId } = require('mongodb');
const {Schemes} =require('../Mongo/DAOs');

var router = express.Router();

router.get('/', async function (req, res) {

    let { lsg } = req.body

    const query = { "lsg": lsg };


    const result = await Schemes.find(query).toArray()

    res.send({data:result})

});

router.post('/view', async function (req, res) {

    let { userId, scheme_id } = req.body

    const query = { "_id":new ObjectId(scheme_id)  };
    let scheme_details= await Schemes.findOne(query)

    let currentViewers=scheme_details?.Viewers

    let result ={data:null}

    console.log(scheme_details);


    if(currentViewers.filter(e => e.id == userId).length<=0)
    {

     result.data = await Schemes.updateOne({"_id":new ObjectId(scheme_id) }, {$push: {Viewers: {"id":userId,time:new Date()}}});
         
    }
    else{

        result.data='Already viewed'
    }

   
    res.send(result)

});


router.post('/', function (req, res) {
    res.send('POST route on Schemes.');
});

//export this router to use in our index.js
module.exports = router;