class generateOTP{

    constructor(userRepo, helper, userUtility){
        this.userRepo = userRepo;
        this.helper = helper;
        this.userUtility = userUtility;
    }

    async handleRequest(req, res){

        try{
            const {email} = req.body;
            const type = req.params.type;

            if(!email){
                return this.helper.writeResponse({msg : "Empty Email" ,code : 400},null,res);
            }
            const DBResp = await this.recruiterRepo.getRecruiterDetailByEmail(email);
            const recruiterData = DBResp || [];
            
            if(type === "0" && recruiterData.length !== 0){
                return this.helper.writeResponse({msg : "The entered Email is already exist!" ,code : 400},{status : false},res);
            }
            else{
                const transporter = await this.recruiterUtility.initNodeMailer();
                await this.recruiterUtility.createOTP(email,transporter);
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