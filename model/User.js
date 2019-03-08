const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    balance:number,
    income:number,
    expense:number,
    transactions:{
        type:[{
            type:Schema.Types.ObjectId,
            ref:"Transaction"
        }]
    }
})


const User = mongoose.model("User",UserSchema)

module.exports = User;