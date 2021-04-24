const express = require("express");
const router = express.Router();
// const checkAuth = require("../middleware/checkAuth");

router.post("/signup/:role",(req,res,next) => {
    req.container.resolve('signUpApi').handleRequest(req,res).catch(next);
});

router.post("/signin/:role",(req,res,next) => {
    req.container.resolve('signInApi').handleRequest(req,res).catch(next);
});

router.post("/generateotp/:type",(req,res,next) => {
    req.container.resolve('generateOTPApi').handleRequest(req,res).catch(next);
});



module.exports = router;