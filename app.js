const express = require("express")

const app = express()

module.exports = app
// const port = 4000
const userRouter = require('./routes/userRoutes') //register the created route
const viewRouter = require('./routes/viewRoutes')
const path = require('path')

app.use(express.json()) // middleware in the  application (req -> json -> res)

app.use(express.static(__dirname+ "public"))


app.use('/api/v1/users',userRouter) //registering the created routes
app.use('/', viewRouter)

app.use(express.static(path.join(__dirname, 'views')))
// app.listen(port, () => {
//     console.log('App runnig on port ${port} ..')
// })
