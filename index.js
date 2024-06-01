const express = require('express')
const app = express()
const conn = require('./db/conn')

const mainRoutes = require('./routes/mainRoutes')


app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use(mainRoutes)



app.listen(3000,()=>{
    console.log('servidor rodando')
})
