module.exports = {
    serverError (res,err){
        console.log(error)
        res.status(500).json({
             message:"Server Error Ocurred"
         })

    },
    resourceError(res,message){
    
        res.status(400).json({
             message
         })
    }
}