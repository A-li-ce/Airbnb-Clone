// intisilation  code : in future if we want to destroy our db nd reinitilise it to yha s kr kste h
const mongoose = require('mongoose');
const Listing = require('../models/listing.js')

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URL);
}


// database function
const InitDB = async () => {
    // await Listing.deleteMany({});
    // InitData.data = InitData.data.map((obj)=>({...obj, owner : "6561cbfc518329d7e81d968b"}))
    // await Listing.insertMany(InitData.data);
    // console.log('data is initialized');
}

InitDB()