const {createEstado, changeEstado, desactiveEstado, getEstado, getEstados} = require("../procedures/estadoProcedures");

exports.addEstado = async (req,res) =>{
    const userData = req.body;
    console.log(userData);
    try{

        const idJwt = req.user.id;        // ID del usuario autenticado (JWT)
        const rolJwt = req.user.id_rol;  // Rol del usuario autenticado (JWT)
        const activoJwt = req.user.activo; // estado del usuario

        console.log("idJwt (usuario autenticado):", idJwt);
        console.log("rolJwt (rol del JWT):", rolJwt);
        console.log("activoJwt (activo del JWT):", activoJwt);

        //PERMISOS, debe estar activo y ser operador = 1 para poder añadir
        if(activoJwt === false || rolJwt !== 1){
            return res.status(403).json({ message: "Sin permisos para realizar esta accion" });
        }
        
        const result = await createEstado(userData);
        res.status(201).json(result);

    }catch(error){
        res.status(500).json({error: error.message})
    }
}

exports.updateEstado = async(req,res) =>{
    const {id} = req.params;
    const userData = req.body;
    userData.id_estado = id;

    console.log(userData);

    try {
        const idJwt = req.user.id;        // ID del usuario autenticado (JWT)
        const rolJwt = req.user.id_rol;  // Rol del usuario autenticado (JWT)
        const activoJwt = req.user.activo; // estado del usuario

        console.log("idJwt (usuario autenticado):", idJwt);
        console.log("rolJwt (rol del JWT):", rolJwt);
        console.log("activoJwt (activo del JWT):", activoJwt);
        
        //PERMISOS, debe estar activo y ser operador = 1 para poder actualizar
        if(activoJwt === false || rolJwt !== 1){
            return res.status(403).json({ message: "Sin permisos para realizar esta accion" });
        }

        const result = await changeEstado(userData);
        res.status(201).json(result);
    } catch(error){
        res.status(500).json({error: error.message});
    }
}

exports.deleteEstado = async(req,res) =>{
    const {id} = req.params;

    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "ID inválido o no proporcionado" });
    }
    console.log(id);

    try {

        const idJwt = req.user.id;        // ID del usuario autenticado (JWT)
        const rolJwt = req.user.id_rol;  // Rol del usuario autenticado (JWT)
        const activoJwt = req.user.activo; // estado del usuario

        console.log("idJwt (usuario autenticado):", idJwt);
        console.log("rolJwt (rol del JWT):", rolJwt);
        console.log("activoJwt (activo del JWT):", activoJwt);
        
        //PERMISOS, debe estar activo y ser operador = 1 para poder desactivar
        if(activoJwt === false || rolJwt !== 1){
            return res.status(403).json({ message: "Sin permisos para realizar esta accion" });
        }

        const result = await desactiveEstado(id);
        res.status(200).json(result);
    } catch(error){
        res.status(500).json({error: error.message});
    }
}

exports.getEstadoById = async (req, res) =>{
    const {id} = req.params;

    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "ID inválido o no proporcionado" });
    }
  
    try{
      const result = await getEstado(id);
      res.status(201).json(result);
    } catch(error){
      res.status(500).json({error: error.message})
    }
}

exports.getAllEstados = async (req, res) => {
    try {
      const users = await getEstados();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

