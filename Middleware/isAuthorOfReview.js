const ReviewModel = require("../Models/ReviewModel");


const isAuthorOfReview=async(req,res,next)=>{

    const {id,reviewId}=req.params ;
    const review=await ReviewModel.findById(reviewId)
    
    if(!(review.author===res.locals.currUser.id)){
        req.flash('error',"Unauthorized Error")
        return res.redirect(`/listings/${id}`)
    }
    next() 
}

module.exports=isAuthorOfReview