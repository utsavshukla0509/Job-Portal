


class RecruiterRepo {

    constructor(mysqlClient) {
        this.mysqlClient = mysqlClient;
    }

    
        async getCandidateDetailByEmail(email){
            return new Promise((resolve,reject)=>{
                const query = `SELECT * FROM candidate WHERE email = ? ;`;
                return this.mysqlClient.query(query,email,(err,result) => {
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
    
        async createCandidate(name,email,resume){
            return new Promise((resolve,reject)=>{
                const query = `INSERT INTO candidate (name,email,resume) VALUES (?,?,?);`;
                return this.mysqlClient.query(query,[name,email,resume],(err,result) =>{
                
                if(err){
                    reject(err);
                }
                return resolve(result);
            });
        });
    }
}
    
    module.exports = RecruiterRepo;