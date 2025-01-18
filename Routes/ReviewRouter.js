const express=require('express')
const wrapAsync = require('../UtilityFunctions/AsyncHandler')
const ListingModel = require('../models/ListingModels')
const { createNewReview, deleteReview } = require('../Controllers/ReviewController')

const ReviewRouter=express.Router()

// post route-> to create a new Review 
ReviewRouter.post('/',createNewReview)

ReviewRouter.delete('/:reviewId',deleteReview)


module.exports=ReviewRouter