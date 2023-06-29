function logErrors(error, req, res, next){
  console.log("logErrors")
  console.error(error)
  next(error)
}
//hay que colocar si o si next, porque es la forma que detecta que es un middleware del tipo error(cuatro parametros)
function errorHandler(error, req, res, next){
  console.log("errorHandler")
  res.status(500).json({
    message: error.message,
    stack: error.stack
  })
}

function boomErrorHandler(error, req, res, next){
  if(error.isBoom){
    const {output} = error
    res.status(output.statusCode).json(output.payload)
  }else{
    next(error)
  }
}

module.exports = {logErrors, errorHandler, boomErrorHandler}
