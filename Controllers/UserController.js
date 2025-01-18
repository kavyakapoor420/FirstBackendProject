const passport = require("passport");
const UserModel = require("../Models/UserModels");
const wrapAsync = require("../UtilityFunctions/AsyncHandler");
const ExpressErrorClass = require("../UtilityFunctions/ExpressErrorClass");
//this file contains authenctication related code like register and login 

const renderLoginPage=wrapAsync(async(req,res)=>{
    res.render('Users/login.ejs')
})

const renderRegisterPage=wrapAsync(async(req,res)=>{
    res.render('Users/Register.ejs')
})

const registerUser=wrapAsync(async(req,res)=>{
    const {username,email,password}=req.body ;
    const existinguser=await UserModel.findOne({email})
    // if user already exists with given email so throw error
    if(existinguser){
      throw new  ExpressErrorClass(404,'user already exist with this email')
    }

    const newUser=new UserModel({
        email,username
    })
     await UserModel.register(newUser,password)

    //after user signups for the first time directly logged him 
       // Automatically log the user in after signup
    req.login(newUser,(err)=>{
       if(err){
        return res.status(500).json({ message: 'Error logging in after signup', error: err });
       }
       return res.status(200).json({ message: 'Signup successful', user });
    })
})

const loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(500).json({ message: 'Login failed', error: err });
      }
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error logging in', error: err });
        }
        return res.status(200).json({ message: 'Login successful', user });
      });
    })(req, res, next);
};

const logoutUser=wrapAsync(async(req,res)=>{
    req.logout((err)=>{
        if(err){
            return res.status(500).send('error in logging out')
        }
        // req.flash('success','u hvae been logged out successfully')
        req.redirect('/user/login')
    })
})

module.exports={
    renderLoginPage,renderRegisterPage,
    registerUser,loginUser,logoutUser
}