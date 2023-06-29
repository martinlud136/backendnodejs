const express = require("express")

const productsRouter = require('./products.routes')
// const usersRouter = require('./users.routes')

function routerApi(app){

const router =express.Router()

app.use("/api/v1", router)

router.use('/products', productsRouter)
// app.use('/users', usersRouter)
}

module.exports = routerApi
