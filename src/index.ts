import mysql from "mysql2/promise";

const MYSQL_HOST = "localhost";
const MYSQL_USER = "root";
const MYSQL_PW = "root";
const MYSQL_DB = "test";
const MYSQL_PORT = 3306;

const pool = mysql.createPool({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PW,
  database: MYSQL_DB,
  port: MYSQL_PORT,
  connectTimeout: 5000,
  connectionLimit: 30, //default 10
});

let allTableDDL: string =
  `INSTALL PLUGIN IF NOT EXISTS FEDERATED SONAME 'ha_federated.so';\n\n` +
  `DROP SCHEMA IF EXISTS FEDERATED_SCHEMA;\n\n` +
  `CREATE SCHEMA FEDERATED_SCHEMA DEFAULT CHARSET=utf8mb4;\n\n` +
  `USE FEDERATED_SCHEMA;\n\n`;

pool
  .getConnection()
  .then(async (connection: mysql.PoolConnection) => {
    for (const table of (
      await connection.query("show tables;")
    )[0] as Object[]) {
      const tableName = table[`Tables_in_${MYSQL_DB}`];
      let tableDDL: string = (
        await connection.query(`show create table ${tableName};`)
      )[0][0]["Create Table"];

      tableDDL = tableDDL.replace(/InnoDB/g, "FEDERATED");
      tableDDL = tableDDL.replace(/MyISAM/g, "FEDERATED");
      tableDDL += ` CONNECTION="mysql://${MYSQL_USER}:${MYSQL_PW}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DB}/${tableName}";\n\n`;

      allTableDDL += tableDDL;
    }
  })
  .finally(() => {
    console.log(allTableDDL);
  });
