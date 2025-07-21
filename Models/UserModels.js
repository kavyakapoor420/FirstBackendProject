const mongoose=require('mongoose')
// const passportLocalMongoose=require('passport-local-mongoose')
const bcrypt=require('bcrypt')

const userSchema=new mongoose.Schema({
   username:{
      type:String,
      required:true,
      unique:true,
      lowercase:true,
      trim:true,
      index:true
   },
   email:{
     type:String,
     required:true,
     unqiue:true,
     lowercase:true,
     trim:true
   },
   password:{
    type:String,
    required:true
   }

})

//hash the password of user  before saving into database
const hashPass=async(next)=>{
    if(!this.isModified('password')) return next() 
    this.password=await bcrypt.hash(this.password,10)
    next()
}

userSchema.pre('save',hashPass)

//for password verification
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

const UserModel=mongoose.model("UserModel",userSchema)

module.exports=UserModel 