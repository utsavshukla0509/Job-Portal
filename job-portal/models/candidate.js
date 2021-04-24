const tableName = "candidate";

const candidateTable = `CREATE TABLE ${tableName} (
id int NOT NULL AUTO_INCREMENT,
name VARCHAR(25) UNIQUE NOT NULL,
email VARCHAR(50),
resume VARCHAR(256),
PRIMARY KEY (id)
);`;

module.exports = candidateTable;