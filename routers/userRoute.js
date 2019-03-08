const router =  require("express").Router()
const {login, register}     = require("../controllers/userController")

//localhost:8920/api/users/register
router.post("/register", register)

//localhost:8920/api/users/login
router.post("/login",login)

module.exports = router ;