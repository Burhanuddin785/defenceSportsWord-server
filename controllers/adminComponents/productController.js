const Product = require("../../models/adminComponents/productModel");
const mongoose = require('mongoose');

const uploadProduct = async (req, res) => {
  try {
    const {
      name,
      serialNumber,
      rate,
      description,
      specifications,
      stock,
      discount,
      isFeatured,
      category,
      subCategory
    } = req.body;

    // Handle multiple image files (uploaded by multer)
    // const images = req.files.map(file => file.filename);
    const folder = req.body.uploadType?.trim().replace(/\s+/g, '_') || 'default';
    
    const images = req.files.map(file => ({
    filename: file.filename,
    url: `/uploads/adminComponents/${folder}/${file.filename}`
  }));

    // Parse specifications from JSON string to array
    const parsedSpecs = specifications ? JSON.parse(specifications) : [];

    const newProduct = new Product({
      name,
      serialNumber,
      rate,
      description,
      specifications: parsedSpecs,
      images,
      stock,
      discount,
      isFeatured,
      category,
      subCategory
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product uploaded successfully",
      product: newProduct
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Server error while uploading product" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // You can .sort(), .select(), etc. here
    res.send(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

const deleteProduct = async(req, res)=>{
  try{
    const {id} = req.params;
    const deleted = await Product.findByIdAndDelete(id);

    if(!deleted) return res.status(404).json({error : "Product not found"})
      else return res.status(200).json({message : "Product deleted successfully"});

    } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Server error" });
    }
}

const getProducts = async(req, res)=>{
  try{
    const {id} = req.params;
    const spec = req.query.spec || null;
    const objectId = mongoose.Types.ObjectId.createFromHexString(id);
    if(spec === null){
      const products = await Product.find({_id : objectId});
      res.send(products)
    }
    else if(spec === "subCategory"){
    
      const products = await Product.find({"subCategory._id" : objectId });
      
      res.send(products);
    }
    else
    { 
      const products = await Product.find({[`${spec}._id`] : objectId}).select("stockQuantity images rate name serialNumber subCategory");
    res.send(products);}
  }catch(err){
    console.error(err);
  }
}

const getFeatured = async(req, res)=>{
  try{
    const products = await Product.find({isFeatured: true});
    res.send(products);
  }catch(err){console.log(err)}
}

module.exports = {
  uploadProduct,
  getAllProducts,
  deleteProduct,
  getProducts,
  getFeatured
};
