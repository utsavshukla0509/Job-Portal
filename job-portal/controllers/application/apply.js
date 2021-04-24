
class Apply{
    
    constructor(applicationRepo, helper){
        this.applicationRepo = applicationRepo;
        this.helper = helper;
    }

    async handleRequest(req, res){

            try{
                const candidateId = req.userData.userId;
                const jobId = req.params.jobId;

                await this.applicationRepo.createApplication(candidateId,jobId);
                
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