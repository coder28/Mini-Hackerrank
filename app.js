const express = require('express')
const userroutes=require('./routes/user')
const bodyParser = require('body-parser')

const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
const port = process.env.PORT || 3000


app.use(userroutes)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})