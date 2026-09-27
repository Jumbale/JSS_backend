const express=require('express')
const app=express()
app.use(express.json())

const cors=require('cors')


app.use(cors())

const path=require('path')

app.use('/api/jss',express.static(path.join(__dirname,'resources/uploads/schoolPhotos/')))



//const middleWare=require("./middleware/AuthController")
//app.use(middleWare)

require('dotenv').config()

const routes=require('./routes/routes')

app.use('/api/jss',routes)


console.log(__dirname)

app.listen(5000,()=>console.log("Listen on port 5000"))