const express = require("express")
const cors = require('cors');

const app = express()
app.use(cors());

module.exports = app
// const port = 4000
const userRouter = require('./routes/userRoutes')
const viewRouter = require('./routes/viewRoutes')
const productRouter = require('./routes/productRoute')
const orderRouter = require('./routes/ordersRoute')


const path = require('path')

app.use(express.json())

app.use(express.static(__dirname+ "public"))


app.use('/api/v1/users',userRouter)
app.use('/api/v1/products',productRouter)
app.use('/api/v1/orders',orderRouter)


app.use('/', viewRouter)

app.use(express.static(path.join(__dirname, 'views')))
// app.listen(port, () => {
//     console.log('App runnig on port ${port} ..')
// })