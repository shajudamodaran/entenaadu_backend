let sendIncompleteParamsresponce = (res, message) =>{
    res.status(422)
    res.send(message)
}


module.exports={sendIncompleteParamsresponce}