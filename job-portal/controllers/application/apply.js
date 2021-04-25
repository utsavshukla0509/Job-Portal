
class Apply{
    
    constructor(applicationRepo,candidateRepo, helper){
        this.applicationRepo = applicationRepo;
        this.candidateRepo = candidateRepo;
        this.helper = helper;
    }

    async handleRequest(req, res){

            try{
                const email = req.userData.email;
                
                let userId;
                if(req.userData.userId === undefined){
                    const data = await this.candidateRepo.getCandidateDetailByEmail(email);
                    userId = data[0].id;
                }
                else{
                    userId = req.userData.userId;
                }
                const jobId = req.get("X-JOBID");
                
                
                const data = await this.applicationRepo.getApplicationDetailByJobIdAndCandidateId(userId,jobId);
                
                if(data.length != 0){
                    return this.helper.writeResponse({msg : "Already Applied" ,code : 400},null,res);
                }

                await this.applicationRepo.createApplication(userId,jobId);
                
                return this.helper.writeResponse(null,{
                    message: "Applied successfully!",
                    status : true
                },res);
            }
            catch(err){
                console.log(err);
                return this.helper.writeResponse({msg : "Internal Server Error" ,code : 500},"",res);
            }
    }
};

module.exports = Apply;