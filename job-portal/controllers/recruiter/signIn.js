
class SignIn{

    constructor(recruiterRepo, helper, recruiterUtility){
        this.recruiterRepo = recruiterRepo;
        this.helper = helper;
        this.recruiterUtility = recruiterUtility;
    }


    async handleRequest(req, res){
        try{

            const { email,otp} = req.body;
            if(!email || !otp) {
                return this.helper.writeResponse({msg : "missing email or otp field" ,code : 400},null,res);
            }
            const recruiterData = await this.recruiterRepo.getRecruiterDetailByEmail(email);
            
            if(recruiterData.length === 0){
                return this.helper.writeResponse({msg : "Email doesn't exist" ,code : 400},{status : false},res);
            }
            const storedOTP = await this.recruiterUtility.getValue(email);
            if(storedOTP !== null){
                if(storedOTP === otp){
                    let recruiterInfo = {};
                    recruiterInfo.userId = recruiterData[0].id;
                    recruiterInfo.username = recruiterData[0].name;
                    recruiterInfo.email = recruiterData[0].email;
                    const token = await this.recruiterUtility.generateToken(recruiterInfo);
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
        catch(error){
            console.log(error);
            return this.helper.writeResponse({msg : "Internal Server Error" ,code : 500},"",res);
        }
    }
};

module.exports = SignIn;