const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require('../utils/wrapAsync.js');
const {isLoggedIn, isOwner, validateListing} = require('../middleware.js');
const listingControllers = require('../controllers/listing.js');
const multer  = require('multer')
const {storage} = require('../cloudConfig.js')
const upload = multer({ storage })

router.route('/')
.get(wrapAsync(listingControllers.index))
.post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingControllers.createListing))


router.get('/new', isLoggedIn, listingControllers.renderNewForm);

router.route('/:id')
.get(wrapAsync(listingControllers.showListing))
.put(isLoggedIn, isOwner ,  upload.single("listing[image]"), validateListing,wrapAsync(listingControllers.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(listingControllers.deleteListing));


router.get('/:id/edit', isLoggedIn,  isOwner, wrapAsync(listingControllers.renderEditFrom));

module.exports = router;