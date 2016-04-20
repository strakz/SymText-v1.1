var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multer = require('multer');
var bcrypt = require('bcryptjs');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var async = require('async');
var request = require('request');
var xml2js = require('xml2js');
var _ = require('lodash');
var dbUrl = 'localhost/daco';
var fs = require('fs');
var Grid = require('gridfs-stream');
var Busboy = require('busboy');


var app = express();


var wordSchema = new mongoose.Schema({
    word: {type: String, unique: true},
    wordType: String,
    filename: String,
    imageID: String
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
var imageSchema = new mongoose.Schema({});

var Word = mongoose.model('Word', wordSchema);
var User = mongoose.model('User', userSchema);
var ImageDB = mongoose.model('imgDB', imageSchema);
mongoose.connect('mongodb://localhost/symtext');
var conn = mongoose.connection;
Grid.mongo = mongoose.mongo;
var gfs = new Grid(conn.db);
var idImg;

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


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
//app.use(multer({dest: './uploads/'}));

app.get('*', function (req, res) {
    res.redirect('/#' + req.originalUrl);
});
//save to Word schema
app.post('/api/words', function (req, res) {
    console.log('daco tu pisem');
    console.log(req.body.word);
    console.log(req.body.singleSelect);
    if(idImg ===null){
        console.log('ziadne ID obrazku ku slovu nebolo priradene ');
    }
    var word = new Word({
        word: req.body.word,
        wordType: req.body.singleSelect,
        filename: req.body.filename,
        imageID: idImg
    });
    word.save(function (err, word) {
        idImg=null;
        if (err) {
            res.send(err);
        }
        res.json(word);

    })
});
// skuska save image to DB
app.post('/api/imgUp', function (req, res) {
    console.log(req.headers);
    console.log('Id Obrazka :' + idImg);
    var value, val2;
    if (req.method === 'POST') {
        var busboy = new Busboy({
            headers: req.headers
        });
        busboy.on('file', function (fieldname, file, filename, encoding,
                                    mimetype) {
            //console.log('daco jak fieldname'+req.body.texfield);
            console.log('File [' + fieldname + ']: filename: ' + filename
                + ', encoding: ' + encoding + ', mimetype: ' + mimetype);

            console.log('slova' + val2 + ' ,' + value);
//			var gfs = Grid(conn.db);
            var ws = gfs.createWriteStream({
                mode: 'w',
                content_type: mimetype,
                filename: filename,
                aliases: val2,
                metadata: {
                    slovo: value

                }
            });

            ws.on('close', function (file) {
                console.log(file._id);
                idImg = file._id;
            });

            file.pipe(ws);
            req.pipe(busboy);
        });

        //busboy.on('finish', function(){
        //_return();
        //});


        //file.on('data', function(data) {
        //console.log('File [' + fieldname + '] got ' + data.length
        //+ ' bytes');
        //});
        //file.on('end', function() { console.log('File [' + fieldname + ']Finished');
        //});

        busboy.on('field', function (fieldname, val, fieldnameTruncated,
                                     valTruncated, encoding, mimetype) {
            console.log('Field [' + fieldname + ']: value: ' + val);
            if (value === null || value === undefined) {
                value = val;
            } else {
                val2 = val;
            }

        });
        busboy.on('finish', function () {
            console.log('Done parsing form!');
            console.log(idImg + 'vs');
            res.writeHead(303, {
                Connection: 'close',
                Location: '/createWord'
            });
            res.end();
        });
        req.pipe(busboy);
    }
});

app.post('/metadata', function (req, res) {
    console.log(req.body.textfield);
    console.log('Id z predchadyajucej veci' + idImg);
    if (req.method === 'POST') {
        var files = gfs.files.find({}).toArray(function (err, files) {
            console.log('nazov ' + files);
            console.log(files);
            console.log('pocet suborov je ' + files.length);
            res.status(200).json(files);

        });
    }
});


//show image from mongo ..hlada podla ID ..
app.post('/nieco', function (req, res) {
    if (req.method === 'POST') {
        console.log('tusom v GET OBRAzok');
        console.log(req.body.imgID);
        var readstream = gfs.createReadStream({
            _id: req.body.imgID
            //metadata.slovo: req.body.imgID
        });
        readstream.on('error', function (err) {
            console.log('An error occurred!', err);
            throw err;
        });

        readstream.pipe(res);

        // gfs.files.find({ filename: "ang.jpg" },function(err, files){
        // // if(err) return next(err);
        // //
        // // if(files.length === 0){
        // // return next(new Error('File does not exist'));
        // // }
        // var file = files[0];
        // console.log(file);
        // res.send(JSON.stringify(files))
        // res.json(200, files);
        // });
    }
});
app.get('/nieco:id', function (req, res) {
    if (req.method === 'get') {
        console.log('tusom v GET OBRAzok');
        console.log(req.body.imgID);
        console.log(req.params);
        var readstream = gfs.createReadStream({
            _id: req.body.imgID
            //metadata.slovo: req.body.imgID
        });
        readstream.on('error', function (err) {
            console.log('An error occurred!', err);
            throw err;
        });

        readstream.pipe(res);

        // gfs.files.find({ filename: "ang.jpg" },function(err, files){
        // // if(err) return next(err);
        // //
        // // if(files.length === 0){
        // // return next(new Error('File does not exist'));
        // // }
        // var file = files[0];
        // console.log(file);
        // res.send(JSON.stringify(files))
        // res.json(200, files);
        // });
    }
});



app.post('/testujem', function (req, res) {

    gfs.findOne({filename: "jysk.jpg"}, function (err, files) {
        if (err) return next(err);
        if (files === null || files === undefined) {
            console.log('nenaslo sa nic')
        }
        //var file = files[0];
        console.log(files);
        //res.send(JSON.stringify(files))
        res.json(200, files);
    });
})

app.post('/api/login', passport.authenticate('local'), function (req, res) {
    res.cookie('user', JSON.stringify(req.user));
    res.send(req.user);
});


app.post('/api/signup', function (req, res, next) {
    console.log(req.body.singleSelect);
    var user = new User({
        username: req.body.username,
        password: req.body.password,
        fullname: req.body.fullname,
        role: req.body.singleSelect
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
    Word.findOne({word: query}, 'filename imageID', function (err, word) {
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
app.post('/api/searchExample', function (req, res) {

    //var query = {};
    //query.slovo = new RegExp(req.body.slovo, 'i');
    var result;
    console.log('som vo vnutri get');
    var query = req.body.text;
    console.log(query);
    //Word.findOne({word: query}, 'wordType filename imageID', function (err, word) {
      Word.find({'word': new RegExp(query, 'i')},'filename imageID word wordType', function(err,word){
        if (err) {
            return res.status(400).send({msg: " error during search DB"});
            //if (!doc) return next(new Error('cant find'));
        }
        console.log(word);
        result=word;
        if (result === null) {
            return res.status(200).send(null);
        } else {
            return res.status(200).send(result);
            //        res.send('odoslane');
        }
    })


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
