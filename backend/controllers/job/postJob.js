
class PostJob{
    
    constructor(recruiterRepo,jobRepo ,helper){
        this.jobRepo = jobRepo;
        this.recruiterRepo = recruiterRepo;
        this.helper = helper;
    }

    async handleRequest(req, res){

            try{
                const {description,skill} = req.body;
                
                let recruiterId,companyname;
                const data = await this.recruiterRepo.getRecruiterDetailByEmail(req.userData.email);
                companyname = data[0].companyname;
                if(req.userData.userId === undefined){
                    recruiterId = data[0].id;
                }
                else{
                    recruiterId = req.userData.userId;
                }
                const companyName = companyname;
                
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