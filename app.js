const express=require('express')
const app=express()
const mongoose=require('mongoose')
const path=require('path')
const methodOverride=require('method-override')
const ejsMate=require('ejs-mate')//required for boilerPlate which will have common code like navbar,footer which has to be displayed on every page show.ejs,new.ejs,index.ejs,edit.ejs
const expressSession=require('express-session')
const flash=require('connect-flash')
const cookieParser=require('cookie-parser')

const passport=require('./PassportConfig/passportLocalStartegy.js')


const UserRouter = require('./Routes/UserRouter.js')
const ReviewRouter = require('./Routes/ReviewRouter.js')
const wrapAsync = require('./UtilityFunctions/AsyncHandler.js')
// const passport = require('passport')
const ListingRouter = require('./Routes/ListingRouter.js')

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))


app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(flash())
app.use(cookieParser())
app.engine('ejs',ejsMate)

app.use(expressSession({
    secret:'helloworld',
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() +7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
}))

//intiliaze passport for authentication
app.use(passport.initialize())
//enable persistent login sessions
app.use(passport.session())

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


//middleware for flasing success,error message on fronted client side
app.use((req,res,next)=>{
    // res.locals allows us to use serveral things we can access in EJS files
    res.locals.success=req.flash('success')
    res.locals.error=req.flash('error')

    res.locals.currUser=req.user
    next()
})

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

async function  main(){
   await mongoose.connect(MONGO_URL)
}

main().then(()=>{
    console.log('connected to db')
}).catch((err)=>{
    console.log(err)
})



app.use('/listings',ListingRouter)
app.use('/user',UserRouter)
app.use('/listings/:id/review',ReviewRouter)

app.get('/about',(req,res)=>{
    res.render('AboutPage.ejs')
})

app.get('/',(req,res)=>{
    res.redirect('/listings')
})
// if user will try to search some url that does not exists so 404 not found page will b shown
app.all("*",wrapAsync((req,res,next)=>{
    {
        (statusCode = 404), (message = "Page Not Found!");
      }
      res.status(statusCode).render("PageNotFound.ejs", { statusCode, message });
}))
//error handing middleware
app.use((err,req,res,next)=>{
    let {statusCode=500,message='something went wrong'}=err ;
    res.render('error.ejs',{message,statusCode})
})

app.listen(3001,()=>{
    console.log('server is listening on port 3000')
})


// to save a dummy listing
// app.get('/testListing',async(req,res)=>{
//     const sampleListing=new ListingModel({
//        //     title: "My New Villa",
//         //     description: "By the beach",
//         //     price: 1200,
//         //     location: "Calangute, Goa",
//         //     country: "India",
//     })
//     await sampleListing.save()
//     // console.log(newListing)
//     res.send('successfull testing')
// })