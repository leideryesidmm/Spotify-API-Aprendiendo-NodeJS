require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnectnosql = require("./config/mongo");
const { dbConnectPostgresql } = require("./config/postgresql");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

const port = process.env.PORT || 3000;
const ENGINE_DB = process.env.ENGINE_DB;
//Invocamos las rutas
app.use("/api", require("./routes"));

app.listen(port, () => {
  console.log(`Tu aplicacion esta lista para usar en http://localhost:${port}`);
});
if (ENGINE_DB === "nosql") dbConnectnosql();
else {
  dbConnectPostgresql();
}
