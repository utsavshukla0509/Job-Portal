const recruiterTable = require("../models/recruiter");
const jobTable = require("../models/job");
const applicationTable = require("../models/application");
const candidateTable = require("../models/candidate");

const mysql = require('mysql');
require('dotenv').config();

const client = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'utsav',
    database : 'jobportal'
  });
   


async function execute(){
    try{
        await client.connect();
        console.log("DB is connected successfully");   
    }
    catch(err){
        console.log(err)
    } 
}

async function initialiseTables(){

    let promises = [];
    const tables = [];
    try{
        for(let i = 0;i < tables.length;i++){
            promises.push(
                client.query(tables[i],(err, result) => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    console.log("Database created...");
                })
            );
        }

        await Promise.all(promises);
    }
    catch(err){
        console.log(err);
    }
}


async function initDBAndTables(){
    let promises = [];
    promises.push(execute());
    promises.push(initialiseTables());

    await Promise.all(promises);
}


module.exports = {
    initDBAndTables : initDBAndTables,
    execute : execute,
    client : client
}
