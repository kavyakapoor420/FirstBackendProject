const express=require('express')
const app=express()
const mongoose=require('mongoose')
const path=require('path')
const methodOverride=require('method-override')
const ejsMate=require('ejs-mate')//required for boilerPlate which will have common code like navbar,footer which has to be displayed on every page show.ejs,new.ejs,index.ejs,edit.ejs
const expressSession=require('express-session')
const flash=require('connect-flash')
const cookieParser=require('cookie-parser')

const ListingModel = require('./models/ListingModels.js')
const UserRouter = require('./Routes/UserRouter.js')
const ReviewRouter = require('./Routes/ReviewRouter.js')
const ExpressErrorClass = require('./UtilityFunctions/ExpressErrorClass.js')
const wrapAsync = require('./UtilityFunctions/AsyncHandler.js')
const passport = require('passport')

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

//index route
app.get('/listings',async(req,res)=>{
    const allListings=await ListingModel.find({})
    res.render('Listings/index.ejs',{allListings})
})
// new route -> to create new listing
app.get('/listings/new',(req,res)=>{
    res.render('Listings/new.ejs')
})
//show route -> to show details of particular listings
app.get('/listings/:id',async(req,res)=>{
    const {id}=req.params ;
    const listing=await ListingModel.findById(id)
    res.render("Listings/show.ejs",{listing})
})
//create route -> to create new listing
app.post('/listings',async(req,res)=>{
    const newListing=new ListingModel(req.body.listing)
    await newListing.save()
    res.redirect('/listings')
})
// edit (GET) route -> this will render a Form that will take details of listingsthe update->POST route 
app.get('/listings/:id/edit',async(req,res)=>{
    const {id}=req.params ;
    const listing=await ListingModel.findById(id)
    res.render('Listings/edit.ejs',{listing})
})
//update route
app.put('/listings/:id',async(req,res)=>{
    let {id}=req.params ;
    await ListingModel.findByIdAndUpdate(id,{...req.body.listing})
    res.redirect(`/listings/${id}`)
})
//destory or delete route -> to delete a particular listing
app.delete("/listings/:id",async(req,res)=>{
    const {id}=req.params ;
    const deletedListing=await ListingModel.findByIdAndDelete(id)
    // console.log(deletedListing)
    res.redirect('/listings')
})

app.use('/user',UserRouter)
app.use('/review/:id',ReviewRouter)

app.get('/about',(req,res)=>{
    res.render('AboutPage.ejs')
})

app.get('/',(req,res)=>{
    res.send('hello from root route')
})

app.all("*",wrapAsync((req,res,next)=>{
     next(new ExpressErrorClass(404,'Page Not found'))
    res.render('PageNotFound.ejs')
}))

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