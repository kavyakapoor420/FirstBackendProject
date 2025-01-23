const Joi=require('joi')

// const listingSchema=Joi.object({
//     listing:Joi.object({
//         title:Joi.string().required(),
//         description:Joi.string().required(),
//         location:Joi.string().required(),
//         price:Joi.number().required().min(0),
//         image:Joi.string().allow('',null),// Allow empty or null it is not required compulsory
//         country:Joi.string().required()
//     })
// })

// module.exports=listingSchema


const listingSchema=Joi.object({
    listing:Joi.object({
        title:Joi.string().required().messages({
            "string.base":"Title should be a string",
             "string.empty":"Title is required"
          }),
          description:Joi.string().required().messages({
            "string.base":"Description should be string",
            "string.empty":"Description is required"
          }),
          image:Joi.string().allow("",null),
    
                price:Joi.number().required().min(0).messages({
                    "number.base":"Price must be a number",
                    "number.empty":"Price is required"
                }),
                location:Joi.string().required.messages({
                    "string.base":"location should be string",
                    "string.empty":"location is required"
                }),
                country:Joi.string().required().messages({
                    "string.base":"counrty should be a string",
                    "string.empty":'country is required'
                }),
                //   category:Joi.string()
        //      .valid(
        //         "Trending",
        //         "Rooms",
        //         "Iconic Cities",
        //         "Mountains",
        //         "Castles",
        //         "Amazing Pools",
        //         "Camping",
        //         "Farms",
        //         "Arctic"
        //      ).required().messages({
        //         "any.only":"Category must be one of specified value",
        //         "string.empty":"Category is required"
        //      })
    })
})

module.exports=listingSchema