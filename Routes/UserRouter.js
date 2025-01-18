const express=require('express')
const { renderLoginPage, renderRegisterPage, loginUser, registerUser}=require("../Controllers/UserController.js")

const UserRouter=express.Router()

UserRouter.get('/login',renderLoginPage)
UserRouter.post('/login',loginUser)

UserRouter.get('/register',renderRegisterPage)
UserRouter.post('/register',registerUser)


module.exports=UserRouter