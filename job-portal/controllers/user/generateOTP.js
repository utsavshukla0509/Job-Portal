class generateOTP{

    constructor(candidateRepo,recruiterRepo, helper, userUtility){
        this.recruiterRepo = recruiterRepo;
        this.candidateRepo = candidateRepo;
        this.helper = helper;
        this.userUtility = userUtility;
    }

    async handleRequest(req, res){

        try{
            const {email} = req.body;
            const type = req.params.type;
            const role = req.params.role;

            if(!email){
                return this.helper.writeResponse({msg : "Empty Email" ,code : 400},null,res);
            }

            let DBResp;
            
            if(role === "recruiter"){
                 DBResp = await this.recruiterRepo.getRecruiterDetailByEmail(email);
            }
            else{
                DBResp = await this.candidateRepo.getCandidateDetailByEmail(email);
            }

            const userData = DBResp || [];
            
            if(type === "0" && userData.length !== 0){
                return this.helper.writeResponse({msg : "The entered Email is already exist!" ,code : 400},{status : false},res);
            }
            else{
                const transporter = await this.userUtility.initNodeMailer();
                await this.userUtility.createOTP(email,transporter);
                return this.helper.writeResponse(null,{"user" : email,"msg" : "OTP has been sent to your Gmail","status" : true},res);
            }
        }
        catch(err){
            console.log(err);
            return this.helper.writeResponse({msg : "Internal Server Error" ,code : 500},"",res);
        }
    }

};

module.exports = generateOTP;