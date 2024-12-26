const express = require("express");
const cors = require('cors'); // Import the cors middleware

const sequelize = require("./config/database");

const userRoutes = require("./routes/userRoutes");
const estadoRoutes = require("./routes/estadoRoutes");
const productoRoutes = require("./routes/productoRoutes");
const rolRoutes = require("./routes/rolRoutes");
const categoriaProductosRoutes = require("./routes/categoriaProductosRoutes");
const ordenRoutes = require("./routes/ordenRoutes");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure CORS middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));

app.use(express.json());
app.use("/api/v1/usuarios", userRoutes);
app.use("/api/v1/estados", estadoRoutes);
app.use("/api/v1/productos", productoRoutes);
app.use("/api/v1/roles", rolRoutes);
app.use("/api/v1/categoriaproductos", categoriaProductosRoutes);
app.use("/api/v1/ordenes", ordenRoutes);

sequelize
  .authenticate()
  .then(() => console.log("Conexión con SQL Server exitosa"))
  .catch((err) => console.error("Error al conectar con la base de datos:", err));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});