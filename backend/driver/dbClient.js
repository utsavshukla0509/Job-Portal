const mysql      = require('mysql');
const mysqlClient = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'utsav',
  database : 'jobportal'
});
 
mysqlClient.connect();

module.exports = mysqlClient;