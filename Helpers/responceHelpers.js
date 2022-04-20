let sendIncompleteParamsresponce = (res, message) =>{
    res.status(422)
    res.send(message)
}

let sendSuccesssresponce = (res, message) =>{
    res.status(200)
    res.send(message)
}


module.exports={sendIncompleteParamsresponce,sendSuccesssresponce}