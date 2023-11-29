const User = require('../models/users.js');

module.exports.renderSignUpFrom = (req, res)=>{
    res.render('users/signup.ejs');
}

module.exports.signUp = async(req, res)=>{
    try{
     let {username, email, password} = req.body;
     const newUser = new User({email, username});
     const registeredUser = await User.register(newUser, password);
     req.login(registeredUser, (err)=>{
         if(err){
             return next(err);
         }
         req.flash('success', 'Signed Up');
         res.redirect('/listings')
     })
     
    }catch(err){
         req.flash('error', err.message);
         res.redirect('/signup')
         console.log(err);
         
    }
}

module.exports.renderLoginForm = (req, res)=>{
    res.render('users/login.ejs');
}

module.exports.login = async(req, res)=>{
    req.flash('success', 'Successfully Logged in');
    let redirectUrl = res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next)=>{
    req.logout((err)=>{
        if (err) {
            return next(err);
        }
        req.flash('success', 'You are Logged out now!');
        res.redirect('/listings');
    })
}