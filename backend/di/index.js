const { createContainer,asValue, asClass, InjectionMode, Lifetime } = require('awilix');

/**
 *
 *@returns {Object} lifetime
 */

function getScope(){
    return {lifetime : Lifetime.SINGLETON };
}

//Driver, Config
const middleware = require("../driver");



const container = createContainer({injectionMode : InjectionMode.CLASSIC});


container.register({
    mysqlClient : asValue(middleware.mysqlClient),
    redisClient : asValue(middleware.redisClient),
});



//APIS
//Recruiter
container.register('signUpApi', asClass(require("../controllers/user/signUp"), getScope()));
container.register('generateOTPApi', asClass(require("../controllers/user/generateOTP"), getScope()));
container.register('signInApi', asClass(require("../controllers/user/signIn"), getScope()));

//Job
container.register('postJobApi', asClass(require("../controllers/job/postJob"), getScope()));
container.register('getAllPostJobApi', asClass(require("../controllers/job/getAllPostJob"), getScope()));
container.register('getAllJobApi', asClass(require("../controllers/job/getAllJob"), getScope()));


//Application
container.register('addApplicationApi', asClass(require("../controllers/application/apply"), getScope()));
container.register('getAllCandidateApi', asClass(require("../controllers/application/getCandidate"), getScope()));
container.register('getAppliedJobApi', asClass(require("../controllers/application/getAppliedJob"), getScope()));


//REPO
container.register('recruiterRepo', asClass(require("../repository/recruiterRepo"), getScope()));
container.register('candidateRepo', asClass(require("../repository/candidateRepo"), getScope()));
container.register('applicationRepo', asClass(require("../repository/applicationRepo"), getScope()));
container.register('jobRepo', asClass(require("../repository/jobRepo"), getScope()));

//Utility
container.register('userUtility', asClass(require("../utilities/userUtility"), getScope()));
container.register('helper', asClass(require("../utilities/helper"), getScope()));



module.exports = container;