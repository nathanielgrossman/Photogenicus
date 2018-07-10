const routes = require('express').Router();
const imagesController = require('../controllers/ImagesController');

routes.options("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Cache-Control');
    res.sendStatus(200);
});

routes.get("/gettrue", imagesController.getTrueImages, function(req, res) {
    res.send(res.locals.trueimages);
});

routes.get("/getfalse", imagesController.getFalseImages, function(req, res) {
    res.send(res.locals.falseimages);
});
  
routes.get("/getfresh", imagesController.getFreshImages, function(req, res) {
    res.send(res.locals.freshimages);
});

routes.post("/upload", imagesController.uploadImages, function(req, res) {
    if ( res.locals.uploadstatus === true ) {
        res.sendStatus(200);
    }
    else {
        console.log("failed upload");
        res.status(500);
        res.locals.err ? res.send(res.locals.err) : res.send("Upload Failed");
    }
});

module.exports = routes;