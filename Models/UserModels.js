const mongoose=require('mongoose')
const passportLocalMongoose=require('passport-local-mongoose')

const userSchema=new mongoose.Schema({
    username: { type: String, required: true },
    email:{
        type:String,
        unique:true,
        required:true
    }
})

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })

const UserModel=mongoose.model("UserModel",userSchema)

module.exports=UserModel 