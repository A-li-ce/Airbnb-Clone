const Listi_ng = require('./models/listing.js');
const {listingSchema , reviewSchema} = require('./schema.js');
const ExpressError = require('./utils/ExpressError.js');
const Review = require('./models/reviews.js');


module.exports.isLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash('error', 'you must be logged in to create listings!')
        return res.redirect('/login');
    } 
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async(req, res, next) => {
    let {id} = req.params;
    let listing = await Listi_ng.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash('error', "You don't have permission for this, You are not owner of this listing");
         return res.redirect(`/listings/${id}`);
    }
    next();
}

// validation code : listing schema 
module.exports.validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errorMsg = error.details.map((elem) => elem.message).join(',');
        throw new ExpressError(400, errorMsg);
    }else{
        next();
    }
}

// validation code: review schema
module.exports.validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errorMsg = error.details.map((elem) => elem.message).join(',');
        throw new ExpressError(400, errorMsg);
    }else{
        next();
    }
}

// checking review author: 
module.exports.isReviewAuthor = async(req, res, next) => {
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash('error', "You don't have permission, You didn't create this review");
         return res.redirect(`/listings/${id}`);
    }
    next();
}