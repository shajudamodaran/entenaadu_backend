var express = require('express');
const { sendIncompleteParamsresponce, sendSuccesssresponce } = require('../Helpers/responceHelpers');
const { Complaints } = require('../Mongo/DAOs');


var router = express.Router();

router.get('/', async function (req, res) {

    let { lsg } = req.body

    const query = { "lsg": lsg };
    // const options = {
    //     "projection": { feeds: 1, _id:0 }
    // };

    const result = await Complaints.find(query).toArray()

    res.send({data:result})


});
router.post('/', async function (req, res) {

    let { lsg, complaint } = req.body

    if (!lsg) {
        sendIncompleteParamsresponce(res, "Lsg code missing in request")
    }
    else if (!complaint) {
        sendIncompleteParamsresponce(res, "Complaint is missing in request")
    }
    else {

        let obj = {
            complaint:complaint,
            image:"",
            lastupdation:new Date(),
            added_date:new Date(),
            lsg:lsg
        }

        let result = await Complaints.insertOne(obj, function (err, resp) {
            if (err) throw err ;

            sendSuccesssresponce(resp,`1 complaint inserted ,${res}`)


        });

    }



});

//export this router to use in our index.js
module.exports = router;