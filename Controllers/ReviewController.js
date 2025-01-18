const ListingModel = require("../models/ListingModels");
const ReviewModel = require("../Models/ReviewModel");
const wrapAsync = require("../UtilityFunctions/AsyncHandler");
const ExpressErrorClass = require("../UtilityFunctions/ExpressErrorClass");

//create a new review and store into that listing for whihc it was given + db 
const createNewReview=wrapAsync(async(req,res)=>{
    const {id}=req.params ;
    const listing=await ListingModel.findById(id)
    //if u r not able to find listing with provided id throw error
    if(!listing){
        throw new ExpressErrorClass(404,'listings does not exists')
    }
    const {rating,comment}=req.body ;
    const userId=id;
    const author=req.user.id ;

    const newRating=new ReviewModel({
        rating,comment,userId,author
    })
    
    listing.rating.push(newRating)

    await newRating.save() 
    await listing.save()

    res.redirect(`/listings/${id}`)
})

// delete review and delete that review from database and from that corresponding listing als
const deleteReview=wrapAsync(async(req,res)=>{
   const {id,reviewId}=req.params;
   const listing=await ListingModel.findByIdAndUpdate(
    id,
    {$pull:{rating:reviewId}},
    {new:true}
   )
   if(!listing){
    throw new ExpressErrorClass(500,'failed to delete rating')
   }

   const deletedReview=await ReviewModel.findByIdAndDelete(reviewId)

   if(!deletedReview){
      throw new ExpressErrorClass(404,'review not found')
   }
   res.redirect(`/listings/${id}`)
})


module.exports={
    createNewReview,deleteReview
}