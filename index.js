const express = require('express')
const cors = require("cors")
const routerApi = require('./routes');

const {logErrors, errorHandler, boomErrorHandler} = require("./middlewares/error.handler")

const app = express()
const port = 3000;

app.use(express.json())

const whitelist = ["http://localhots:8080", "https://myapp.com"]
const options = {
  origin : (origin, callback)=>{
    if(whitelist.includes(origin)){
      callback(null, true)
    }else{
      callback(new Error("no se puede pasar"))
    }
  }
}
app.use(cors(options))

app.get("/", (req, res)=>{
  res.send('Hola mi server en express')
})

app.get("/nueva-ruta", (req, res)=>{
  res.send('Hola soy una nueva ruta')
})

routerApi(app)

//estos van si o si luego del ruteo (routerApi)
//el error es importante tambien
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

//pasarlo cada uno a su routing
// app.get('/users', (req,res)=>{
//   const { limit, offset } = req.query;
//   if(limit && offset){
//     res.json({
//       limit,
//       offset
//     })
//   }else{
//     res.send('No hay parametros')
//   }
// })

// app.get('/categories/:categoryId/products/:productId', (req,res)=>{
//   const {categoryId, productId} = req.params
//   res.json( {
//     categoryId,
//     productId,
//   })
// })



app.listen(port, ()=>{
  console.log('Mi port ' + port)
})

