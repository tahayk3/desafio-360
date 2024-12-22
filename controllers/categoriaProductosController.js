const { createCategoriaProducto, changeCategoriaProducto, desactiveCategoriaProducto, getCategoriaProducto, getCategoriasProductos } = require("../procedures/categoriaProductosProcedures");

exports.addCategoriaProducto = async (req, res) => {
  const userData = req.body;

  console.log(userData);
  try {
    const result = await createCategoriaProducto(userData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCategoriaProducto = async (req, res) =>{
  const {id} = req.params;
  const userData = req.body;
  userData.id_categoria_producto = id;

  console.log(userData);
  
  try{
    const result = await changeCategoriaProducto(userData);
    res.status(200).json(result);
  }catch(error)
  {
    res.status(500).json({error: error.message});
  }
}

exports.deleteCategoriaProducto = async (req, res) =>{
  const {id} = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "ID inválido o no proporcionado" });
  }
  console.log(id);

  try{
    const result = await desactiveCategoriaProducto(id);
    res.status(201).json(result);
  }catch(error){
    res.status(500).json({error: error.message})
  }
}

exports.getCategoriaProductoById = async (req, res) =>{
  const {id} = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "ID inválido o no proporcionado" });
  }

  try{
    const result = await getCategoriaProducto(id);
    res.status(201).json(result);
  } catch(error){
    res.status(500).json({error: error.message})
  }
}

exports.getAllCategoriaProducto = async (req, res) => {
  try {
    const users = await getCategoriasProductos();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};