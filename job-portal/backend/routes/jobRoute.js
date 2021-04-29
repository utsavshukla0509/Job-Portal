const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

router.post("/newjob",checkAuth,(req,res,next) => {
    req.container.resolve('postJobApi').handleRequest(req,res).catch(next);
});


router.get("/detail",checkAuth,(req,res,next) => {
    req.container.resolve('getAllPostJobApi').handleRequest(req,res).catch(next);
});

router.get("/alljob/detail",checkAuth,(req,res,next) => {
    req.container.resolve('getAllJobApi').handleRequest(req,res).catch(next);
});


module.exports = router;