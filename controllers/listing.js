const Listi_ng = require('../models/listing.js');
let apikey = process.env.HERE_MAP_API_KEY;
const axios = require('axios');

module.exports.index = async(req, res)=>{
    const allListings = await Listi_ng.find({});
    res.render('./listings/index.ejs', {allListings});
}

module.exports.renderNewForm = (req, res)=>{
    try {
        res.render('./listings/new.ejs');
    } catch (error) {
        console.log(error);
    }
}

module.exports.showListing = async(req, res)=>{
    let {id} = req.params;
    const listing = await Listi_ng.findById(id)
    .populate({path : 'reviews', populate : {path:'author'},})
    .populate('owner');
    if(!listing){
        req.flash('error', "Listing you requested for doesn't exist")
        res.redirect('/listings')
    }
    // console.log(listing);
    res.render('./listings/show.ejs', {listing});
}

module.exports.createListing = async(req, res, next)=>{
  
   try{
    const userAddress = req.body.listing.location;
    const geocodingResponse = await axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(userAddress)}&apiKey=${apikey}`);
    const locationn = geocodingResponse.data.items[0].position;
  
    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listi_ng(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    // address = userAddress,
    latitude= locationn.lat,
    longitude = locationn.lng
    newListing.geometry.coordinates = [latitude, longitude];
    await newListing.save();
    res.redirect('/listings')   
    req.flash("success", 'New listing created!')
   }catch (error) {
    console.error('Error geocoding address:', error);
    res.redirect('/listings/error');
}

}


module.exports.renderEditFrom = async(req, res)=>{
    let {id} = req.params;
    const listing = await Listi_ng.findById(id);
    if(!listing){
        req.flash('error', "Listing you requested for doesn't exist")
        res.redirect('/listings')
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl= originalImageUrl.replace('/upload/h_300/w_250')

    res.render('./listings/edit.ejs',{listing, originalImageUrl})
}

module.exports.updateListing  = async(req, res)=>{
        let {id} = req.params;
        let listing = await Listi_ng.findByIdAndUpdate(id, {...req.body.listing})
    
        if( typeof req.file !== "undefined"){
                let url = req.file.path;
                let filename = req.file.filename;
                listing.image = {url, filename}
                await listing.save()
            }
        
            req.flash("success", 'Listing updated!')
            res.redirect(`/listings/${id}`);
        }
        

module.exports.deleteListing = async(req, res)=>{
    let {id} = req.params;
    let deleteListing = await Listi_ng.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("success", 'Listing deleted!')
    res.redirect('/listings');
}


module.exports.trendingListings = async (req, res) =>{
    res.send('treding');
}
