var mongoose = require('mongoose');
var fs = require('fs');
var Grid = require('gridfs-stream');
var Busboy = require('busboy');


exports.upload = function(req, res) {
    if (req.method === 'POST') {
        var busboy = new Busboy({
            headers : req.headers
        });
        busboy.on('file', function(fieldname, file, filename, encoding,
                                   mimetype) {
            console.log('File [' + fieldname + ']: filename: ' + filename
                + ', encoding: ' + encoding + ', mimetype: ' + mimetype);

//			var gfs = Grid(conn.db);
            var ws = gfs.createWriteStream({
                mode : 'w',
                content_type : mimetype,
                filename : filename,
                // metadata : {
                // // Any props you want to add
                // }
            });

            ws.on('close', function(file) {
                console.log(file._id);

            });

            file.pipe(ws);

        });

        // busboy.on('finish', function(){
        // _return();
        // });

        req.pipe(busboy);

        // file.on('data', function(data) {
        // console.log('File [' + fieldname + '] got ' + data.length
        // + ' bytes');
        // });
        // file.on('end', function() { console.log('File [' + fieldname + ']
        // Finished');
        // });

        busboy.on('field', function(fieldname, val, fieldnameTruncated,
                                    valTruncated, encoding, mimetype) {
            console.log('Field [' + fieldname + ']: value: ' + val);
        });
        busboy.on('finish', function() {
            console.log('Done parsing form!');
            res.writeHead(303, {
                Connection : 'close',
                Location : '/'
            });
            res.end();
        });
        req.pipe(busboy);
    }
};
