const Joi=require('joi')

// const reviewSchema=Joi.object({
//     review:Joi.object({
//         rating:Joi.number().required().min(1).max(5),
//         comment:Joi.string().required()
//     })
// })


// module.exports=reviewSchema


const reviewSchema=Joi.object({
    review:Joi.object({
       rating:Joi.number().min(1).max(5).required().messages({
        'number.base':'rating should be number',
        "number.empty":"rating is required"
       }),
       comment:Joi.string().required().messages({
        "string.base":"comment should be string",
        "string.empty":'comment is required'
       })
    })
})

module.exports=reviewSchema