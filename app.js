const express = require("express");
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1/users", userRoutes);

sequelize
  .authenticate()
  .then(() => console.log("Conexión con SQL Server exitosa"))
  .catch((err) => console.error("Error al conectar con la base de datos:", err));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
