
class GetAllJob{

    constructor(applicationRepo,candidateRepo ,helper){
      this.applicationRepo = applicationRepo;
      this.candidateRepo = candidateRepo;
      this.helper = helper;
    }
      
    async handleRequest(req,res){    
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

          if(!userId) {
            return this.helper.writeResponse({msg : "Missing User Id" ,code : 400},null,res);
          }

            const userData = await this.applicationRepo.getAllAppliedJobsByUserId(userId);
            return this.helper.writeResponse(null,{userData},res);  
          
        }
        catch(error){
          console.log(error);
          return this.helper.writeResponse({msg : "Internal server error" ,code : 500},null,res);
        }
      }
  }
  
  
  module.exports = GetAllJob;