const mongoose=require('mongoose')
const initData=require('./data.js')
const ListingModel = require('../models/ListingModels')

const MONGO_URL='mongodb://127.0.0.1:27017/wanderlust'

async function main() {
    await mongoose.connect(MONGO_URL)
}

main().then(()=>{
    console.log('connected to db')
}).catch((err)=>{
    console.log(err)
})

const initDb=async()=>{
    // await ListingModel.deleteMany({})
    await ListingModel.insertMany(initData.data)
    console.log('data was initiallised into Database')
}

initDb()