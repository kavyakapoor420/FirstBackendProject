// this file contains code for performing ALl CRUD operations
// create,read,update,deleted listings
const ListingModel=require('../models/ListingModels.js')
const mongoose=require('mongoose')
const wrapAsync = require("../UtilityFunctions/AsyncHandler");
const ExpressErrorClass = require("../UtilityFunctions/ExpressErrorClass");

//this will display all the listing after fetching from database
//Show all listings on home page (GET /listings)
const displayAllListings=wrapAsync(async(req,res)=>{
    const allListings=await ListingModel.find({})
    if(!allListings){
        throw new ExpressErrorClass(500,'failed to fetch listings')
    }
    res.render('Listings/index.ejs',{allListings})
})

const diplayDetailsOfListingByid=wrapAsync(async(req,res)=>{
  const {id}=req.params ;
  if(!mongoose.isValidObjectId(id)){
    return res.status(404).render('Listings/error.ejs',{statusCode:"404",message:"page not found"})
  }
  // const listing=await ListingModel.findById(id).populate({path:'rating',populate:{path:'author'}}).populate('owner')
  const  listing = await ListingModel.findById(id).populate({path:"rating",
    populate:{
        path:"author"
    },
}
 ).populate("owner");
   
  if(!listing){
    req.flash('error','listing does not exists')
    res.redirect('/listings')
  }
  res.render('Listings/show.ejs',{listing})

})

const renderEditForm=wrapAsync(async(req,res)=>{
    const {id}=req.params ;
    const listing=await ListingModel.findById(id)
    if(!listing){
      throw new ExpressErrorClass(404,'listing not found')
    }
    res.render('Listings/edit.ejs',{listing})
})

const updateListing=wrapAsync(async(req,res)=>{
   const {id}=req.params ;
     await ListingModel.findByIdAndUpdate(id,{...req.body.listing})
     req.flash('success','listing updated successfully')
     res.redirect(`/listings/${id}`)
})

const renderCreateNewListingForm=wrapAsync(async(requestAnimationFrame,res)=>{
   res.render('Listings/new.ejs')
})

const createNewListing=wrapAsync(async(req,res)=>{
  //  let {title,image,description,price,location,country}=req.body 
  const listing=req.body.listing
    if(!listing){
    throw new ExpressErrorClass(500,'failed to create listing')
   }
   const newListing=await ListingModel.create(listing)
    
   newListing.owner=req.user._id 
   await newListing.save() 
   req.flash('success','listing created successfully')
   res.redirect('/listings')
})

const deletedListingById=wrapAsync(async(req,res)=>{
    const {id}=req.params ;
    const deletedListing=await ListingModel.findByIdAndDelete(id)

    if(!deletedListing){
        throw new ExpressErrorClass(404,'listing not found')
    }
})


module.exports={
    renderCreateNewListingForm,renderEditForm,
    displayAllListings,diplayDetailsOfListingByid,
    deletedListingById,createNewListing,updateListing
}