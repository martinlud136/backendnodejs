const express = require('express')
const cors = require("cors")
const routerApi = require('./routes');

const {logErrors, errorHandler, boomErrorHandler} = require("./middlewares/error.handler")

const app = express()
//requerimiento de vercel leer el puerto desde una variable de ambiente
const port = process.env.PORT || 3000;

app.use(express.json())

// const whitelist = ["http://localhots:8080", "https://myapp.com", "http://localhots:3000"]
// const options = {
//   origin : (origin, callback)=>{
//     console.log({origin})
//     if(whitelist.includes(origin)){
//       callback(null, true)
//     }else{
//       callback(new Error("no se puede pasar"))
//     }
//   }
// }
app.use(cors())

//requerimiento de vercel es que la ruta sea /api
app.get("/api", (req, res)=>{
  res.send('Hola mi server en express')
})

app.get("/api/nueva-ruta", (req, res)=>{
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

