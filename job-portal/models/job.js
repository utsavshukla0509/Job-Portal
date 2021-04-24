const tableName = "job";

const jobTable = `CREATE TABLE ${tableName} (
id int NOT NULL AUTO_INCREMENT,
recruiterid int NOT NULL,
companyname VARCHAR(25) UNIQUE NOT NULL,
createdon DATE,
active VARCHAR(15),
skill VARCHAR(50),
PRIMARY KEY (id)
);`;

module.exports = jobTable;