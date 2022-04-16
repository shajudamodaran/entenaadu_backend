var express = require('express');
var router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
const { BloodBank } = require('../Mongo/DAOs');

router.get('/', async function (req, res) {

    let { lsg, group } = req.body

    if (!lsg) {
        res.status(422)
        res.send("Lsg code is missing")
    }
    else if (!group) {

        res.status(422)
        res.send("Blood group is missing")
    }

    else {

        const query = { "lsg": lsg, "group": group };
        // const options = {
        //     "projection": { feeds: 1, _id: 0 }
        // };

        const result = await BloodBank.find(query).toArray()

        res.send(result)


    }




});
router.post('/', async function (req, res) {

    let { group, lsg, phone, place, yob, name } = req.body

    if (!group) {
        res.status(422)
        res.send("Bloodgroup is missing")
    }
    else if (!lsg) {
        res.status(422)
        res.send("Lsg code is missing")
    }
    else if (!phone) {
        res.status(422)
        res.send("Phone number is missing")
    }
    else if (!place) {
        res.status(422)
        res.send("Place is missing")
    }
    else if (!place) {
        res.status(422)
        res.send("Place is missing")
    }
    else if (!yob) {
        res.status(422)
        res.send("Year of birth is missing")
    }
    else if (!name) {
        res.status(422)
        res.send("Name is missing")
    }
    else {

        let ifExist = await BloodBank.find({
            "group": group,
            "lsg": lsg,
            "phone": phone,
            "place": place,
            "yob": yob,
            "name": name
        }).toArray()

        if (ifExist.length > 0) {

            res.status(406)
            res.send("User already exist with same data")

        }
        else {

            let obj =
            {
                "_id": new ObjectId(),
                "group": group,
                "lsg": lsg,
                "phone": phone,
                "place": place,
                "yob": yob,
                "name": name
            }

            let result= await BloodBank.insertOne(obj)

            res.status(200)
            res.send(result)

        }



    }


});

//export this router to use in our index.js
module.exports = router;