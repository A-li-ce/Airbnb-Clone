const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require('../utils/wrapAsync.js');
const {isLoggedIn, validateReview, isReviewAuthor} = require('../middleware.js');
const { destroyReview, createReview } = require('../controllers/reviews.js');


// post review route:
router.post('/', isLoggedIn ,validateReview, wrapAsync(createReview));

// delete review route: 
router.delete('/:reviewId', isLoggedIn, isReviewAuthor,wrapAsync(destroyReview));

module.exports = router;