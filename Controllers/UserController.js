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

    const newUser=await  UserModel.create({
        email,username,password
    })
    

    //after user signups for the first time directly logged him 
       // Automatically log the user in after signup
   req.login(newUser,(err)=>{
    if(err){
        return next(err)
    }
    req.flash('success',`welcome ${username} on NestQuest`)
    res.redirect('/listings')
   })
})

const loginUser = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      } // Handle any errors
  
      if (!user) {
        req.flash("error", info.message || "Login failed.");
        return res.redirect("/user/login");
      }
  
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
  
        req.flash(
          "success",
          `Welcome Back ${user.userName}, NestQuest feels better with you!`
        );
        res.redirect(res.locals.redirectUrl || "/listings");
      });
    })(req, res, next); // Call the passport middleware
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