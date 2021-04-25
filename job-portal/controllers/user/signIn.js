
class SignIn{

    constructor(recruiterRepo, helper, userUtility,candidateRepo){
        this.recruiterRepo = recruiterRepo;
        this.candidateRepo = candidateRepo;
        this.helper = helper;
        this.userUtility = userUtility;
    }


    async handleRequest(req, res){

        try{
            const role = req.params.role;
            const { email,otp} = req.body;
            if(!email || !otp) {
                return this.helper.writeResponse({msg : "missing email or otp field" ,code : 400},null,res);
            }

            if(role === "recruiter"){
                
                const recruiterData = await this.recruiterRepo.getRecruiterDetailByEmail(email);
                
                if(recruiterData.length === 0){
                    return this.helper.writeResponse({msg : "Email doesn't exist" ,code : 400},{status : false},res);
                }
                const storedOTP = await this.userUtility.getValue(email);
                if(storedOTP !== null){
                    if(storedOTP === otp){
                        let userInfo = {};
                        userInfo.userId = recruiterData[0].id;
                        userInfo.username = recruiterData[0].name;
                        userInfo.email = recruiterData[0].email;
                        const token = await this.userUtility.generateToken(userInfo);
                        userInfo.token = token;   
                        return this.helper.writeResponse(null,  {
                            msg: "Authentication has been successful",
                            status : true,
                            userInfo
                        },res);     

                    }
                    else{
                        return this.helper.writeResponse({msg : "Incorrect OTP" ,code : 400},{status : false},res);
                    }
            }
            else{
                return this.helper.writeResponse({msg : "OTP expired" ,code : 400},{status : false},res);
            }   
        }
        else{
            
            const candidateData = await this.candidateRepo.getCandidateDetailByEmail(email);
            
            if(candidateData.length === 0){
                return this.helper.writeResponse({msg : "Email doesn't exist" ,code : 400},{status : false},res);
            }

            const storedOTP = await this.userUtility.getValue(email);
            if(storedOTP !== null){
                if(storedOTP === otp){
                    let userInfo = {};
                    userInfo.userId = candidateData[0].id;
                    userInfo.username = candidateData[0].name;
                    userInfo.email = candidateData[0].email;
                    const token = await this.userUtility.generateToken(userInfo);
                    userInfo.token = token;   
                    return this.helper.writeResponse(null,  {
                        msg: "Authentication has been successful",
                        status : true,
                        userInfo
                    },res);     

                }
                else{
                    return this.helper.writeResponse({msg : "Incorrect OTP" ,code : 400},{status : false},res);
                }
            }
            else{
                return this.helper.writeResponse({msg : "OTP expired" ,code : 400},{status : false},res);
            }   
        }
               
        }
        catch(error){
            console.log(error);
            return this.helper.writeResponse({msg : "Internal Server Error" ,code : 500},"",res);
        }
    }
};

module.exports = SignIn;