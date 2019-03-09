const registerValidator = require("../validator/registerValidator");
const loginValidator    = require("../validator/loginValidator")
const jwt = require("jsonwebtoken")
const User =  require("../model/User")
const bcrypt = require("bcrypt") ;
const {serverError , resourceError}    = require("../utils/error")

module.exports = {
    login(req,res){
        let {email , password}  = req.body
        let validate = loginValidator({email,password})

        if(!validate.isValid){
            return res.json(validate.error).status(400)
        }

        User.findOne({email})
            .then(user=>{
                if(!user){
                    return resourceError(res,"User Not Found")
                }
                bcrypt.compare(password,user.password,(err,result)=>{
                    if(err){
                        return serverError(res,err)
                    }

                    if(!result){
                        return resourceError(res,"Password Doesn't Match")
                    }

                    let token  = jwt.sign({
                        _id : user._id,
                        name:user.name,
                        email:user.email
                    },"SECRET",{expiresIn:"2h"})

                    res.status(200).json({
                        message:"Login Successful",
                        token :`Bearer ${token}`
                    })
                })
            })
            .catch(error => serverError(res,error) )

    },
    register(req,res){
        //read Client Data
        let {name , email , password , confirmPassword } = req.body


        //User Validation data
        let validator = registerValidator({name,email,password,confirmPassword})

        if(!validator.isValid){
            res.json(validator.error).status(400)
        }else{
            console.log(email)
            User.findOne({email})
                .then(user=>{
                    if(user){
                       return resourceError(res,"Email Already Exist")
                    }

                    bcrypt.hash(password,11,(err,hash)=>{
                        if(err){

                       return resourceError(res,"Server Error Ocurred")
                       
                        }
                        let user = new User({
                            name,
                            email,
                            password:hash
                        })
                        
                        user.save()
                            .then(user=>{
                                res.json({
                                    message:"User Created Successfully",
                                    user
                                }).status(201)
                            })
                            .catch(error=> serverError(res,error))

                    
                     })

                })
                .catch(error=> serverError(res,error))
        }

    }
}