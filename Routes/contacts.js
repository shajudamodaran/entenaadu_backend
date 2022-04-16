var express = require('express');
const Contacts = require('../Mongo/contactDAO');

var router = express.Router();

router.get('/', async function (req, res) {

    let { lsg, category } = req.body

    console.log(lsg, category);

    if (!lsg) {

        res.status(422)
        res.send("Lsg code is missing")
    }
    else {

        let query

        if(category)
        {
             query = { "lsg": lsg, "category":category };

        }
        else{

             query = { "lsg": lsg };
        }

    
        const result = await Contacts.find(query).toArray()



        res.send(result)

    }



});
router.post('/', function (req, res) {
    res.send('POST route on Contacts.');
});

//export this router to use in our index.js
module.exports = router;