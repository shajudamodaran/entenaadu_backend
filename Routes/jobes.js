var express = require('express');
const { ObjectId } = require('mongodb');
const {Jobes} =require('../Mongo/DAOs');

var router = express.Router();

router.get('/', async function (req, res) {

    let { lsg } = req.body

    const query = { "lsg": lsg };
    
    const result = await Jobes.find(query)

    res.send({data:result})

});

router.post('/view', async function (req, res) {

    let { userId, job_id } = req.body

    const query = { "_id":new ObjectId(job_id)  };
    let jod_details= await Jobes.findOne(query)

    let currentViewers=jod_details.Viewers

    let result ={data:null}


    if(currentViewers.filter(e => e.id == userId).length<=0)
    {

        result.data = await Jobes.updateOne({"_id":new ObjectId(job_id) }, {$push: {Viewers: {"id":userId,time:new Date()}}});
         
    }
    else{

        result.data='Already viewed'
    }

   
    res.send(result)

});


router.post('/', function (req, res) {
    res.send('POST route on Jobes.');
});

//export this router to use in our index.js
module.exports = router;