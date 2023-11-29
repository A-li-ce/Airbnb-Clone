const Listi_ng = require('../models/listing.js');
const Review = require('../models/reviews.js');


module.exports.createReview = async(req, res)=>{
    let {id} = req.params;
    let listing = await Listi_ng.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", 'New review added!')
    res.redirect(`/listings/${id}`);

}

module.exports.destroyReview = async(req, res)=>{
    let {id, reviewId} = req.params;

    await Listi_ng.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", 'Review deleted!')
    res.redirect(`/listings/${id}`);
}