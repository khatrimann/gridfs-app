var express = require('express');
var mongoose = require('mongoose');
const Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;

var imageRouter = express.Router();

imageRouter.get('/', (req, res, next) => {
    
    mongoose.connection.db.collection("fs.files", function(err, collection){
        var readstream;
        var buff = [];
        var gfs = Grid(mongoose.connection.db);
        collection.find({}).toArray(function(err, data){
            // console.log(data); // it will print your collection data
            for(var i=0;i<data.length;i++) {
              console.log(data[i]._id);
              readstream = gfs.createReadStream({_id: data[i]._id});
              // console.log(readstream);
              
              readstream.on('data', (chunks) => {
                buff.push(chunks);
                
              });
              
              
            }
            readstream.on('end', function() {
                const fbuf = Buffer.concat(buff);
                res.setHeader('Content-Type', 'image/jpeg');
                res.writeHead(res.statusCode);
                res.write(fbuf);
                res.end();
                
            });
        });
        // res.statusCode = 200;
        // res.end();
    });
    

});

module.exports = imageRouter;