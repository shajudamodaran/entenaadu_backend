var express = require('express');
const { sendIncompleteParamsresponce } = require('../Helpers/responceHelpers');
const { Complaints } = require('../Mongo/DAOs');


var router = express.Router();

router.get('/', async function (req, res) {

    let { lsg } = req.body

    const query = { "lsg": lsg };
    // const options = {
    //     "projection": { feeds: 1, _id:0 }
    // };

    const result = await Complaints.find(query).toArray()

    res.send(result)


});
router.post('/', function (req, res) {

    let { lsg, complaint } = req.body

    if(!lsg)
    {
       sendIncompleteParamsresponce(res,"Lsg code missing")
    }
    else if(!complaint)
    {
       sendIncompleteParamsresponce(res,"no complaints")
    }


    res.send('POST route on complaints.');
});

//export this router to use in our index.js
module.exports = router;