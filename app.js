const express = require("express")
const path =require('path')
const app = express()


const userRouter = require('./routes/userRoutes') 
const viewRouter = require('./routes/viewRoutes')

app.use(express.json()) 
app.use(express.static(__dirname+ "public"))
app.use('/api/v1/users',userRouter) 
app.use('/', viewRouter)

app.use(express.static(path.join(__dirname, 'views')))
module.exports = app
