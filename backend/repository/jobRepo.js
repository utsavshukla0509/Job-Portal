


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

        async getAllJobDetailByCompanyName(companyName){
            return new Promise((resolve,reject)=>{
                const query = `SELECT * FROM job WHERE companyname = ? ORDER BY createdon DESC;`;
                return this.mysqlClient.query(query,companyName,(err,result) => {
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

        async getAllJobDetail(){
            return new Promise((resolve,reject)=>{
                const query = `SELECT * FROM job ORDER BY createdon DESC;`;
                return this.mysqlClient.query(query,(err,result) => {
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
    
        async createJob(recruiterId,companyName,description,skill){
            return new Promise((resolve,reject)=>{
                const query = `INSERT INTO job (recruiterid,companyname,description,createdon,active,skill) VALUES (?,?,?,?,?,?);`;
                return this.mysqlClient.query(query,[recruiterId,companyName,description,new Date(),"Y",skill],(err,result) =>{
                
                if(err){
                    reject(err);
                }
                return resolve(result);
            });
        });
    }
}
    
    module.exports = RecruiterRepo;