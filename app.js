const express = require("express")

const app = express()

module.exports = app
// const port = 4000
const userRouter = require('./routes/userRoutes')
const viewRouter = require('./routes/viewRoutes')
const path = require('path')

app.use(express.json())

app.use(express.static(__dirname+ "public"))


app.use('/api/v1/users',userRouter)
app.use('/', viewRouter)

app.use(express.static(path.join(__dirname, 'views')))
// app.listen(port, () => {
//     console.log('App runnig on port ${port} ..')
// })