// if the user is not authenticated(means like not loggedIn so) we will
// redirect them to login page but we have to save their originalUrl
// after they will logged in they will redirect to originalUrl

const saveRedirectUrl=(req,res,next)=>{
     if(req.session.redirectUrl){
        res.locals.redirectUrl=req.sesssion.redirectUrl
     }
}


module.exports=saveRedirectUrl