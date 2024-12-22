const { createOrden, changeOrden, getOrden, getOrdenes, changeOrdenEncabezado } = require('../procedures/ordenProcedures');

exports.addOrden = async (req,res) =>{
    const userData = req.body;
    console.log(userData);

    try{
        const result = await createOrden(userData);
        res.status(200).json(result);
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}

exports.updateOrden = async (req, res) => {
    const { id } = req.params; // Obtenemos el ID de la orden
    const userData = req.body; // Obtenemos los datos de la orden desde el cuerpo del request
    userData.id_orden = id; // Agregamos el ID de la orden al objeto de datos

    try {
        const result = await changeOrden(userData);
        res.status(200).json(result); // Enviamos la respuesta al cliente
    } catch (error) {
        res.status(500).json({ error: error.message }); // Enviamos el error al cliente
    }
};

exports.updateOrdenEncabezado = async (req, res) => {
  const { id } = req.params; // Obtenemos el ID de la orden
  const userData = req.body; // Obtenemos los datos de la orden desde el cuerpo del request
  userData.id_orden = id; // Agregamos el ID de la orden al objeto de datos

  try {
      const result = await changeOrdenEncabezado(userData);
      res.status(200).json(result); // Enviamos la respuesta al cliente
  } catch (error) {
      res.status(500).json({ error: error.message }); // Enviamos el error al cliente
  }
};

exports.getOrdenById = async (req, res) =>{
    const { id } = req.params;
  
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "ID inválido o no proporcionado" });
    }
    console.log(id);
  
    try {
      const result = await getOrden(id);
      res.status(201).json(result);
    } catch(error){
      res.status(500).json({error: error.message});
    }
  }
  
  exports.getAllOrdenes = async (req,res) =>{
    try {
      const users = await getOrdenes();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  



