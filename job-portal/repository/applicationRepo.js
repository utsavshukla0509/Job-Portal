


class ApplicationRepo {

    constructor(mysqlClient) {
        this.mysqlClient = mysqlClient;
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