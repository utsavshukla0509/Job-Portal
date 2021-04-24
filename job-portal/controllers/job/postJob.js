
class PostJob{
    
    constructor(jobRepo, helper){
        this.jobRepo = jobRepo;
        this.helper = helper;
    }

    async handleRequest(req, res){

            try{
                const {companyName,description,active,skill} = req.body;
                const recruiterId = req.userData.userId;
                
                
                if(!companyName){
                    return this.helper.writeResponse({msg : "company name is missing" ,code : 400},null,res);
                }

                await this.jobRepo.createJob(recruiterId,companyName,description,active,skill);
                const jobData = await this.jobRepo.getJobDetailByRecruiterId(recruiterId);
                
                return this.helper.writeResponse(null,{
                    message: "The user account and platform has been signed/set up successfully!",
                    status : true,
                    jobData
                },res);
            }
            catch(err){
                console.log(err);
                return this.helper.writeResponse({msg : "Internal Server Error" ,code : 500},"",res);
            }
    }
};

module.exports = PostJob;