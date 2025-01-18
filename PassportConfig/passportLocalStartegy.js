const passport=require('passport')
const UserModel = require('../Models/UserModels')
const LocalStrategy=require('passport-local').Strategy 

passport.use(new LocalStrategy(
    {usernameField:'email'},  // specify that we r using email instead of username
    
    async(email,password,done)=>{
        try{
             const user=await UserModel.findOne({email})

             if(!user){
                return done(null,false,{message:"incorrect email"})
             }

             const isMatchPassword=await user.isPasswordCorrect(password)

             if(!isMatchPassword){
                return done(null,false,{message:'incorrect password'})
             }
             return done(null,user)
        }catch(err){
             return done(err)
        }
    }
))

passport.serializeUser(function(user,done){
     done(null,user.id)
})

passport.deserializeUser(async(id,done)=>{
    try{
          const user=await UserModel.findById(id)
          done(null,user)
    }catch(err){
          done(err)
    }
})


module.exports=passport