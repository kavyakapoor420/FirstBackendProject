// this file contains code for validating the listing and review 

const listingSchema = require("../JoiSchemaValidations/ListingSchema")
const reviewSchema = require("../JoiSchemaValidations/ReviewSchema")
const ExpressErrorClass = require("../UtilityFunctions/ExpressErrorClass")


const validateListing=(req,res,next)=>{
     let {error}=listingSchema.validate(req.body)

     if(error){
        let errMsg=error.details.map((ele)=>ele.message).join(',')
        throw new ExpressErrorClass(404,errMsg)
     }else{
        next()
     }
}

const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.valid(req.body)

    if(error){
        let errMsg=error.details.map((ele)=>ele.message).join(',')
        throw new ExpressErrorClass(404,errMsg)
    }else{
        next()
    }
}

module.exports={
    validateListing,validateReview
}