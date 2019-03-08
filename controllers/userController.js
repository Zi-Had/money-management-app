const registerValidator = require("../validator/registerValidator");




module.exports = {
    login(req,res){
        let name = req.body.name
        let email = req.body.email
        res.json({
            message:`Welcome Mr. ${name}. We Will Contact With You by ${email}`
        })
    },
    register(req,res){
        //read Client Data
        let {name , email , password , confirmPassword } = req.body


        //User Validation data
        let validator = registerValidator({name,email,password,confirmPassword})

        if(!validator.isValid){
            res.json(validator.error).status(400)
        }else{
            res.json({
                message:"EveryThing Is Okey !"
            }).status(200)
        }
        //check duplicate data
        // new User Object 
        //save to Database 
        //response back with new Data
    }
}