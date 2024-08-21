const Sequelize = require("sequelize");

const database = process.env.POSTGRE_DB;
const username = process.env.POSTGRE_USERNAME;
const password = process.env.POSTGRE_PASSWORD;
const host = process.env.POSTGRE_HOST;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: "postgres",
});

const dbConnectPostgresql = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexion bd correcta");
  } catch (error) {
    console.log("Error conexion bd", error);
  }
};
module.exports = { sequelize, dbConnectPostgresql };
