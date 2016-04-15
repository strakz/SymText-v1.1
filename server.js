var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var async = require('async');
var request = require('request');
var xml2js = require('xml2js');
var _ = require('lodash');
var dbUrl = 'localhost/daco';

var app = express();

var wordSchema = new mongoose.Schema({
    word: {type: String, unique: true},
    wordType: String,
    filename: String
});


var userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    fullname: {type: String, required: true},
    role: Number
});

userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});
//userSchema.methods.comparePassword = function (candidatePassword, cb) {
//    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
//        if (err) return cb(err);
//        cb(null, isMatch);
//    });
//};
userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

var Word = mongoose.model('Word', wordSchema);
var User = mongoose.model('User', userSchema);
mongoose.connect('mongodb://localhost/daco');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
//TOTO SOM PRIDAL
//passport.use(new LocalStrategy(
//    function (username, password, done) {
//        User.findOne({username: username}, function (err, user) {
//                if (err) {
//                    return done(err);
//                }
//                if (!user) {
//                    return done(null, false, {message: 'Incorrect username.'});
//                }
//                //if (user.comparePassword(password)) {
//                //    return done(null, false, { message: 'Incorrect password.' });
//                //}
//                //return done(null, user);
//                user.comparePassword(password, function (err, isMatch) {
//                    if (err) return done(err);
//                    if (isMatch) return done(null, user);
//                    return done(null, false, {message: 'Incorrect password.'});
//                });
//            }
//        )
//    }
//));


passport.use(new LocalStrategy({usernameField: 'username'}, function (username, password, done) {
    User.findOne({username: username}, function (err, user) {
        if (err) return done(err);
        if (!user) return done(null, false);
        user.comparePassword(password, function (err, isMatch) {
            if (err) return done(err);
            if (isMatch) return done(null, user);
            return done(null, false);
        });
    });
}));


app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({secret: 'keyboard cat', cookie: {maxAge: 60000}, resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    if (req.user) {
        res.cookie('user', JSON.stringify(req.user));
    }
    next();
});

app.get('*', function (req, res) {
    res.redirect('/#' + req.originalUrl);
});
//save to Word schema
app.post('/api/words', function (req, res) {
    console.log('daco tu pisem');
    console.log(req.body.word);

    var word = new Word({
        word: req.body.word,
        wordType: req.body.wordType,
        filename: req.body.filename
    });
    word.save(function (err, word) {

        if (err) {
            res.send(err);
        }
        res.json(word);

    })
});

app.post('/api/login', passport.authenticate('local'), function (req, res) {
    res.cookie('user', JSON.stringify(req.user));
    res.send(req.user);
});


app.post('/api/signup', function (req, res, next) {
    var user = new User({
        username: req.body.username,
        password: req.body.password,
        fullname: req.body.fullname,
        role: req.body.role
    });
    user.save(function (err) {
        if (err) return next(err);
        res.send(200);
    });
});

app.post('/api/hladaj', function (req, res) {
    console.log('text len tak ci tu dosiel');
    //console.log('tu je daco?' + req.body);
    //var query = {};
    //query.slovo = new RegExp(req.body.slovo, 'i');
var query = req.body.slovo;
    console.log(query);
    Word.findOne({word:query},'filename', function (err, word) {
            if (err) {
                return res.status(400).send({msg: " error during search DB"});
                //if (!doc) return next(new Error('cant find'));
            }
                console.log(word);
            return res.status(200).send(word);
    //        res.send('odoslane');
        }
    )
});

app.get('/api/logout', function (req, res, next) {
    req.logout();
    res.send(200);
});


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) next();
    else res.send(401);
};

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({message: err.message});
});


app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
