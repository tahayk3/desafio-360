const {createRol, changeRol, desactiveRol, getRol, getRoles} = require("../procedures/rolProcedures")


exports.addRol = async (req,res) =>{
    const userData = req.body;
    console.log(userData);
    try{
        const result = await createRol(userData);
        res.status(201).json(result);
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

exports.updateRol = async(req,res) =>{
    const {id} = req.params;
    const userData = req.body;
    userData.id_rol = id;

    console.log(userData);

    try {
        const result = await changeRol(userData);
        res.status(201).json(result);
    } catch(error){
        res.status(500).json({error: error.message});
    }
}

exports.deleteRol = async(req,res) =>{
    const {id} = req.params;

    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "ID inválido o no proporcionado" });
    }
    console.log(id);

    try {
        const result = await desactiveRol(id);
        res.status(200).json(result);
    } catch(error){
        res.status(500).json({error: error.message});
    }
}

exports.getRolById = async (req, res) =>{
    const {id} = req.params;

    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "ID inválido o no proporcionado" });
    }
  
    try{
      const result = await getRol(id);
      res.status(201).json(result);
    } catch(error){
      res.status(500).json({error: error.message})
    }
}

exports.getAllRoles = async (req, res) => {
    try {
      const users = await getRoles();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

