
class PostJob{
    
    constructor(jobRepo, helper){
        this.jobRepo = jobRepo;
        this.helper = helper;
    }

    async handleRequest(req, res){

            try{
                const {companyname,description,skill} = req.body;
                const recruiterId = req.userData.userId;
                const companyName = companyname;
                // console.log(companyName,description,skill);
                
                
                if(!companyName){
                    return this.helper.writeResponse({msg : "company name is missing" ,code : 400},null,res);
                }

                await this.jobRepo.createJob(recruiterId,companyName,description,skill);
                // const jobData = await this.jobRepo.getJobDetailByRecruiterId(recruiterId);
                
                return this.helper.writeResponse(null,{
                    msg: "Job is successfully created",
                    status : true,
                    // jobData
                },res);
            }
            catch(err){
                console.log(err);
                return this.helper.writeResponse({msg : "Internal Server Error" ,code : 500},"",res);
            }
    }
};

module.exports = PostJob;