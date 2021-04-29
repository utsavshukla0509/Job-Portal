const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

router.post("/apply",checkAuth,(req,res,next) => {
    req.container.resolve('addApplicationApi').handleRequest(req,res).catch(next);
});

router.get("/detail/:jobId",checkAuth,(req,res,next) => {
    req.container.resolve('getAllCandidateApi').handleRequest(req,res).catch(next);
});

router.get("/applied",checkAuth,(req,res,next) => {
    req.container.resolve('getAppliedJobApi').handleRequest(req,res).catch(next);
});

module.exports = router;