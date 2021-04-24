const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

router.post("/newjob",checkAuth,(req,res,next) => {
    req.container.resolve('postJobApi').handleRequest(req,res).catch(next);
});



module.exports = router;