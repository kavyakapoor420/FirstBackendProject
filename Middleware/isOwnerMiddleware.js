const ListingModel = require("../models/ListingModels");


const isOwner=async(req,res,next)=>{
    const {id}=req.params ;
    const listing=await ListingModel.findById(id)

    if(res.locals.currUser && !(listing.owner==res.locals.currUser.id)){
        req.flash('error','Unauthorized User!')

        return res.redirect(`/listings/${id}`)
    }
    next()
}

module.exports=isOwner