
class SignIn{

    constructor(recruiterRepo, helper, userUtility){
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
                        let recruiterInfo = {};
                        recruiterInfo.userId = recruiterData[0].id;
                        recruiterInfo.username = recruiterData[0].name;
                        recruiterInfo.email = recruiterData[0].email;
                        const token = await this.userUtility.generateToken(recruiterInfo);
                        recruiterInfo.token = token;   
                        return this.helper.writeResponse(null,  {
                            msg: "Authentication has been successful",
                            status : true,
                            recruiterInfo
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
                    let candidateInfo = {};
                    candidateInfo.userId = candidateData[0].id;
                    candidateInfo.username = candidateData[0].name;
                    candidateInfo.email = candidateData[0].email;
                    const token = await this.userUtility.generateToken(candidateInfo);
                    candidateInfo.token = token;   
                    return this.helper.writeResponse(null,  {
                        msg: "Authentication has been successful",
                        status : true,
                        candidateInfo
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