const express=require('express')

const { createNewReview, deleteReview } = require('../Controllers/ReviewController')
const isLoggedIn = require('../Middleware/isLoggedInMiddleware')
const { validateReview } = require('../Middleware/ValidationMiddleware')
const isAuthorOfReview = require('../Middleware/isAuthorOfReview')

const ReviewRouter=express.Router({mergeParams:true})

// post route-> to create a new Review 
ReviewRouter.post('/',isLoggedIn,validateReview,createNewReview)

ReviewRouter.delete('/:reviewId',isLoggedIn,isAuthorOfReview,deleteReview)


module.exports=ReviewRouter