const express=require('express')
const app=express()
const mongoose=require('mongoose')
const path=require('path')
const methodOverride=require('method-override')
const ejsMate=require('ejs-mate')

const ListingModel = require('./models/ListingModels')

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))


app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method'))

app.engine('ejs',ejsMate)

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

app.get('/',(req,res)=>{
    res.send('hello from root route')
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