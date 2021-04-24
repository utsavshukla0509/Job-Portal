const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

router.post("/apply/:jobId",checkAuth,(req,res,next) => {
    req.container.resolve('addApplicationApi').handleRequest(req,res).catch(next);
});



module.exports = router;