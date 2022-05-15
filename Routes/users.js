var express = require('express');
const { ObjectId } = require('mongodb');
const { sendSuccesssresponce, sendAlertresponce, sendIncompleteParamsresponce } = require('../Helpers/responceHelpers');
const { Users } = require('../Mongo/DAOs');

var router = express.Router();

router.get('/signup', async function (req, res) {

    let { name,email,mobile,fnm,rationShop, lsg } = req.body

    if(!mobile)
    {
        sendIncompleteParamsresponce(res,"mobile number cant empty")
    }
    else
    {


        const query1 = { "mobile": mobile };
        let findUser= await Users.findOne(query1)

        if(findUser)
        {
            sendSuccesssresponce(res,{userAlreadyExist:true, userProfile:findUser})
        }
        else{

            let obj =
            {
                "_id": new ObjectId(),
                name,email,mobile,fnm,rationShop,lsg
            }

            let result= await Users.insertOne(obj)

            sendSuccesssresponce(res,result)
        }

      
        

    }

  


});
router.post('/', function (req, res) {
    res.send('POST route on users.');
});

//export this router to use in our index.js
module.exports = router;