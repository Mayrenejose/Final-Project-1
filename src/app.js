import express from 'express'
import mongoose from 'mongoose'
import handlebars from 'express-handlebars'
import routerProducts from './routes/products/index.js'
import routerCarts from './routes/carts/index.js'
import viewsHandlebars from './routes/views/index.js'
import __dirname from './utils.js'
import { Server } from 'socket.io'

const PORT = 8080
const url = 'mongodb+srv://mayrenemora:vvCKCb2SZDcZK3zR@clustermm.s0kqhdq.mongodb.net/'
const mongoDB = 'ecommerce'
let io

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect(url, {dbName: mongoDB})
.then(() => {
    console.log('Conectado DB')
    const httpServer = app.listen(PORT, () => { console.log(`server listened on port ${PORT}`) })
    io = new Server(httpServer)

    //setting handlebars
    app.engine('handlebars', handlebars.engine())
    app.set('views', __dirname + '/views')
    app.set('view engine', 'handlebars')

    //routes
    app.use(express.static(__dirname + '/public'))
    app.use('/api/products', routerProducts)
    app.use('/api/carts', routerCarts)
    app.use('/view', viewsHandlebars)

    //sockets
    io.on('connection', socket => {
        console.log('new user')
    })
})
.catch(error => console.error('Error in connection', error))

export { io }