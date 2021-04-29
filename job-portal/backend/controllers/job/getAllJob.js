
class GetAllJob{

    constructor(jobRepo, helper){
      this.jobRepo = jobRepo;
      this.helper = helper;
    }
      
    async handleRequest(req,res){    
        try{
            const jobData = await this.jobRepo.getAllJobDetail();
            // console.log(jobData);
            return this.helper.writeResponse(null,{jobData},res);
        }
        catch(error){
          console.log(error);
          return this.helper.writeResponse({msg : "Internal server error" ,code : 500},null,res);
        }
      }
  }
  
  
  module.exports = GetAllJob;