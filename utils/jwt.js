const jwt = require('jsonwebtoken');
require("dotenv").config();

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        //Tiempo de expiracion del token
        expiresIn: process.env.JWT_EXPIRATION,
    });
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch(error) {
        //retornar null si el token no es valido
        return null;
    }
}

module.exports = {generateToken, verifyToken};