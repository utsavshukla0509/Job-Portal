


class RecruiterRepo {

    constructor(mysqlClient) {
        this.mysqlClient = mysqlClient;
    }
    
        // async getUserDetailById(userId){
        //     const query = `SELECT * FROM public.userinfo WHERE userid = ${userId};`;
        //     return this.postgresClient.query(query);
        // }
    
        async getRecruiterDetailByEmail(email){
            return new Promise((resolve,reject)=>{
                const query = `SELECT * FROM recruiter WHERE email = ? ;`;
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
    
        async createRecruiter(name,email,companyName){
            return new Promise((resolve,reject)=>{
                const query = `INSERT INTO recruiter (name,email,companyname) VALUES (?,?,?);`;
                return this.mysqlClient.query(query,[name,email,companyName],(err,result) =>{
                
                if(err){
                    reject(err);
                }
                return resolve(result);
            });
        });
    }
}
    
    module.exports = RecruiterRepo;