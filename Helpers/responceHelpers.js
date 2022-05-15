let sendIncompleteParamsresponce = (res, message) =>{
    res.status(422)
    res.send({error:message})
}

let sendSuccesssresponce = (res, message) =>{
    res.status(200)
    res.send({data:message})
}

let sendAlertresponce = (res, message) =>{
    res.status(409)
    res.send({data:message})
}



module.exports={sendIncompleteParamsresponce,sendSuccesssresponce, sendAlertresponce}