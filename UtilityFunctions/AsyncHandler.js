const wrapAsync=(requesHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requesHandler(req,res,next)).catch((err)=>next(err))
    }
}

module.exports=wrapAsync

// module.exports=function wrapAsync(fn){
//     return function(req,res,next){
//         fn(req,res,next).catch(next)
//     }
// }