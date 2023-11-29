if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
} 

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/users.js')
const listingsRouter = require('./routes/listing.js');
const reviewsRouter = require('./routes/reviews.js');
const usersRouter = require('./routes/user.js');

const dbURL = process.env.ALTASDB_URL;

main()
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
})


async function main(){
    await mongoose.connect(dbURL);
}

const store = MongoStore.create({
    mongoUrl : dbURL,
    crypto: {
        secret : process.env.SECRET
    },
    touchAfter: 24 * 3600,
})

store.on('error', ()=>{
    console.log('Error in MONGO SESSION STORE', err);
})

const sessionOptions = {
    store,
    secret : process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000, 
        httpOnly : true,
    },
};


app.use(express.json());
app.set("views engine", 'ejs');
app.set("views", path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use(session(sessionOptions))
app.use(flash());




app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware for flash
app.use((req, res, next )=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currUser = req.user;
    next();
})

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", usersRouter);
app.get('/', (req, res)=>{
    res.render('includes/explore.ejs');
});

app.all('*',(req, res, next)=>{
    next(new ExpressError(404,"Page Not Found!"));
});

// express middleware
app.use((err, req, res, next)=>{
    let {statusCode=500, message="something went wrong"} = err;
    res.status(statusCode).render('error.ejs', {message});
});


app.listen(3000, ()=>{
    console.log("server is listening to port 3000");
});
