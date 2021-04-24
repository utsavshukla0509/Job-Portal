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
//User
container.register('signUpApi', asClass(require("../controllers/recruiter/signUp"), getScope()));
container.register('generateOTPApi', asClass(require("../controllers/recruiter/generateOTP"), getScope()));
container.register('signInApi', asClass(require("../controllers/recruiter/signIn"), getScope()));

//REPO
container.register('recruiterRepo', asClass(require("../repository/recruiterRepo"), getScope()));

//Utility
container.register('recruiterUtility', asClass(require("../utilities/recruiterUtility"), getScope()));
container.register('helper', asClass(require("../utilities/helper"), getScope()));



module.exports = container;