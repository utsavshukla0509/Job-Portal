const tableName = "recruiter";

const recruiterTable = `CREATE TABLE ${tableName} (
id int NOT NULL AUTO_INCREMENT,
email VARCHAR(25) UNIQUE NOT NULL,
name VARCHAR(20),
companyname VARCHAR(50),
PRIMARY KEY(id)
);`;

module.exports = recruiterTable;