const Category = require('../../models/adminComponents/categoryModel');

const uploadCategory = async (req, res) => {
  try {
    const { name, tagLine } = req.body;

    // Multer stores files in req.files
    const templateImage = req.files.templateImage?.[0]?.filename;
    const heroImage = req.files.heroImage?.[0]?.filename;

    if (!name || !tagLine || !templateImage || !heroImage) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newCategory = new Category({
      name,
      templateImage,
      heroImage,
      tagLine,
    });

    await newCategory.save();
    res.status(201).json({ message: "Category uploaded successfully", category: newCategory });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find(); // You can .sort(), .select(), etc. here
    res.send(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getFeaturedCategories = async (req, res) => {
  try {const categories = await Category.find().limit(3).select('name tagLine templateImage');
  res.send(categories);}
  catch (error){
    console.log(error); res.status(500).json({error: "Failed to fetch categories"});
  }
};

const getHero = async( req, res) => {
  try{
    const {id} = req.params
    const hero = await Category.find({_id : id}).select('heroImage')
    res.send(hero);
  }
  catch(error){console.log(error)}
}

const getName = async( req, res) => {
  try{
    const {id} = req.params
    const name = await Category.find({_id : id}).select('name');
    res.send(name);
  }catch(err){
    console.log(err)
  }
}

module.exports = {deleteCategory, getAllCategories, uploadCategory, getFeaturedCategories, getHero, getName };
