


class ApplicationRepo {

    constructor(mysqlClient) {
        this.mysqlClient = mysqlClient;
    }

    async getAllCandidateDetailByJobId(jobId){
        return new Promise((resolve,reject)=>{
            const query = `SELECT application.candidateid,application.status,candidate.name,candidate.email,candidate.resume 
            FROM application LEFT JOIN candidate ON application.candidateid = candidate.id WHERE application.jobid = ? ;`;
            return this.mysqlClient.query(query,jobId,(err,result) => {
                if(err){
                    reject(err);
                }
                if(result.length === 0){
                    return resolve([]);
                }
                return resolve(result);  
            });
        });
    }
    
        async createApplication(candidateId,jobId){
            return new Promise((resolve,reject)=>{
                const query = `INSERT INTO application (jobid, cnadidateid,applied,status) VALUES (?,?,?,?);`;
                return this.mysqlClient.query(query,[jobId,candidateId,new Date(),"screening"],(err,result) =>{
                
                if(err){
                    reject(err);
                }
                return resolve(result);
            });
        });
    }
}
    
    module.exports = ApplicationRepo;