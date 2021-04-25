const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

router.post("/newjob",(req,res,next) => {
    req.container.resolve('postJobApi').handleRequest(req,res).catch(next);
});

router.get("/detail",(req,res,next) => {
    req.container.resolve('getAllJobApi').handleRequest(req,res).catch(next);
});



module.exports = router;