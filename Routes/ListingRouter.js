
const express=require('express')
const isLoggedIn = require('../Middleware/isLoggedInMiddleware')
const { renderCreateNewListingForm, createNewListing, displayAllListings, diplayDetailsOfListingByid, renderEditForm, deletedListingById, updateListing } = require('../Controllers/ListingController')
const isOwner = require('../Middleware/isOwnerMiddleware')
const { validateListing } = require('../Middleware/ValidationMiddleware')
const isAuthorOfReview = require('../Middleware/isAuthorOfReview')

const ListingRouter=express.Router()


// new (GET) route -> this wil display a form that will takes details of listing from user then post route will create new listings
ListingRouter.get('/new',isLoggedIn,renderCreateNewListingForm)
//create new listing(POST) route -> to create new listing
ListingRouter.post('/',validateListing,createNewListing)
//index route -> this will display all the listing available in our database
ListingRouter.get('/',displayAllListings)
//show route -> to show details of particular listings
ListingRouter.get('/:id',diplayDetailsOfListingByid)
// edit (GET) route -> this will render a Form that will take details of listingsthe update->POST route 
ListingRouter.get('/:id/edit',isOwner,renderEditForm)
//update route
ListingRouter.put('/:id',isLoggedIn,isOwner,validateListing,updateListing)
//destory or delete route -> to delete a particular listing
ListingRouter.delete('/:id',isLoggedIn,isAuthorOfReview,deletedListingById)





module.exports=ListingRouter