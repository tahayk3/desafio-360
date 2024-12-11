const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mssql",
  dialectOptions: {
    encrypt: false, // Para instancias locales, usualmente no es necesario cifrado
    trustServerCertificate: true, // Para evitar problemas con certificados locales
    options: {
      instanceName: process.env.DB_INSTANCE, // Nombre de la instancia
    },
  },
  logging: console.log, // Habilitar logs para debug
});

module.exports = sequelize;
