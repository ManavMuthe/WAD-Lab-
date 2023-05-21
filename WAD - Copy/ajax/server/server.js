const express = require("express")
const app = express()
const path = require("path")

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.post("/test",(req, res)=>{

    console.log(req.body)
    res.json(req.body)
})

app.listen(5000, ()=>{
    console.log("Started in 5000")
})

