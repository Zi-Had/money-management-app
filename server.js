const express    = require("express");
const morgan     = require("morgan");
const PORT       = process.env.PORT || 8920 ;
const bodyParser = require("body-parser");
const cors       = require("cors");
const mongoose   = require("mongoose");
const app        = express();

app.use(morgan("dev"));
app.use(cors()) ;
app.use(bodyParser.urlencoded({extends:false})) ;
app.use(bodyParser.json()) ;

app.get("/",(req,res)=>{
    res.json({
        message:"Welcome To Our Application <3"
    })
})


app.listen(PORT,()=>{
    console.log(`Server Is Running On PORT  ${PORT}`)
    mongoose.connect('mongodb://localhost:27017/money-management-app',
        {useNewUrlParser: true} ,
        ()=>{
        console.log("Database Connected....")
    });
})