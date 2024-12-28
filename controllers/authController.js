const { loginUser } = require("../procedures/authProcedures");
const { generateToken } = require("../utils/jwt");

/**
 * Controlador para manejo de inicio de sesion
 */

exports.login = async (req, res) => {
    const {correo, password} = req.body;

    try{
        //llamar al procedimiento para iniciar sesion
        const user = await loginUser(correo, password);

        //Generar el token
        const token = generateToken({id: user.id_usuario, correo: user.correo, id_rol: user.id_rol});

        //responder con el token
        res.status(200).json({token});
        
    } catch(error){
        res.status(401).json({message:error.message});
    }
};