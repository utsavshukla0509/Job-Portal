


class RecruiterRepo {

    constructor(mysqlClient) {
        this.mysqlClient = mysqlClient;
    }

    
        async getJobDetailByRecruiterId(recruiterId){
            return new Promise((resolve,reject)=>{
                const query = `SELECT * FROM job WHERE recruiterid = ? ;`;
                return this.mysqlClient.query(query,recruiterId,(err,result) => {
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
    
        async createJob(recruiterId,companyName,description,active,skill){
            return new Promise((resolve,reject)=>{
                const query = `INSERT INTO job (recruiterid,companyname,description,createdon,active,skill) VALUES (?,?,?,?,?,?);`;
                return this.mysqlClient.query(query,[recruiterId,companyName,description,new Date(),active,skill],(err,result) =>{
                
                if(err){
                    reject(err);
                }
                return resolve(result);
            });
        });
    }
}
    
    module.exports = RecruiterRepo;