const tableName = "application";

const applicationTable = `CREATE TABLE ${tableName} (
jobid int NOT NULL ,
candidateid int NOT NULL,
applied DATE,
status VARCHAR(20)
);`;

module.exports = applicationTable;