
class GetAllPostJob{

    constructor(jobRepo, helper){
      this.jobRepo = jobRepo;
      this.helper = helper;
    }
      
    async handleRequest(req,res){    
        try{
          const companyName = req.userData.companyname;

          if(!companyName) {
            return this.helper.writeResponse({msg : "Missing Company Field" ,code : 400},null,res);
          }

            const jobData = await this.jobRepo.getAllJobDetailByCompanyName(companyName);
            return this.helper.writeResponse(null,{jobData},res);  
          
        }
        catch(error){
          console.log(error);
          return this.helper.writeResponse({msg : "Internal server error" ,code : 500},null,res);
        }
      }
  }
  
  
  module.exports = GetAllPostJob;