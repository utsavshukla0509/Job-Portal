
class SignUp{
    
    constructor(recruiterRepo, candidateRepo, userUtility, helper){
        this.userUtility = userUtility;
        this.recruiterRepo = recruiterRepo;
        this.candidateRepo = candidateRepo;
        this.helper = helper;
    }

    async handleRequest(req, res){

            try{
                
                const role = req.params.role;
                if(role === "recruiter"){

                    const {name,email,companyName,otp} = req.body;
                    if(!name){
                        return this.helper.writeResponse({msg : "missing name field" ,code : 400},null,res);
                    }
                    else if(!email){
                        return this.helper.writeResponse({msg : "missing email field" ,code : 400},null,res);
                    }
                    else if(!companyName){
                        return this.helper.writeResponse({msg : "missing company name field" ,code : 400},null,res);
                    }
                    else if(!otp){
                        return this.helper.writeResponse({msg : "missing otp field" ,code : 400},null,res);
                    }


                    const storedOTP = await this.userUtility.getValue(email);
                    if(storedOTP !== null){
                        if(storedOTP === otp){

                            await this.recruiterRepo.createRecruiter(name,email,companyName);
                            const recruiterData = await this.recruiterRepo.getRecruiterDetailByEmail(email);
                            
                            return this.helper.writeResponse(null,{
                                message: "The user account and platform has been signed/set up successfully!",
                                status : true,
                                recruiterData
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

                    const {name,email,resume,otp} = req.body;
                    if(!name){
                        return this.helper.writeResponse({msg : "missing name field" ,code : 400},null,res);
                    }
                    else if(!email){
                        return this.helper.writeResponse({msg : "missing email field" ,code : 400},null,res);
                    }
                    else if(!resume){
                        return this.helper.writeResponse({msg : "missing resume field" ,code : 400},null,res);
                    }
                    else if(!otp){
                        return this.helper.writeResponse({msg : "missing otp field" ,code : 400},null,res);
                    }


                    const storedOTP = await this.userUtility.getValue(email);
                    if(storedOTP !== null){
                        if(storedOTP === otp){

                            await this.candidateRepo.createCandidate(name,email,resume);
                            const candidateData = await this.candidateRepo.getCandidateDetailByEmail(email);
                            
                            return this.helper.writeResponse(null,{
                                message: "The user account and platform has been signed/set up successfully!",
                                status : true,
                                candidateData
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
            catch(err){
                console.log(err);
                return this.helper.writeResponse({msg : "Internal Server Error" ,code : 500},"",res);
            }
    }
};

module.exports = SignUp;