
class GetAllJob{

    constructor(applicationRepo, helper){
      this.applicationRepo = applicationRepo;
      this.helper = helper;
    }
      
    async handleRequest(req,res){    
        try{
          const jobId = req.params.jobId;

          if(!jobId) {
            return this.helper.writeResponse({msg : "Missing Job Id" ,code : 400},null,res);
          }

            const candidateData = await this.applicationRepo.getAllCandidateDetailByJobId(jobId);
            return this.helper.writeResponse(null,{candidateData},res);  
          
        }
        catch(error){
          console.log(error);
          return this.helper.writeResponse({msg : "Internal server error" ,code : 500},null,res);
        }
      }
  }
  
  
  module.exports = GetAllJob;