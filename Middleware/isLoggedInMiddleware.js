
const isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl ;
        req.flash('error','You need to be logged in to access this page.')
        return res.redirect('/user/login')// Return to avoid calling next() if not authenticated
    }
    next() ; // proceed to next middleware if user is authentciated
}

module.exports=isLoggedIn