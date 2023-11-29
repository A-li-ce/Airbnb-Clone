const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    desc: String,
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews : [
       {    type : Schema.Types.ObjectId,
            ref : "Review",
        },
    ],
    owner : {
        type: Schema.Types.ObjectId,
        ref : "User",
    },
    geometry : {
        coordinates: {
            type : [Number],
            required: true
        }
    }
});

listingSchema.post('findOneAndDelete', async(listing) =>{
   if (listing) {
    await Review.deleteMany ({_id : {$in : listing.reviews}});
   }
})


// creating model:

const Listi_ng = mongoose.model('Listi_ng', listingSchema);
module.exports = Listi_ng;