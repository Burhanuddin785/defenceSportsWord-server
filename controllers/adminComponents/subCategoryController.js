const SubCategory = require('../../models/adminComponents/subCategoryModel');

const uploadSubCategory = async (req, res) => {
  try {
    const { name, tagLine, parentCategory } = req.body;
    const cardImage = req.files.cardImage?.[0]?.filename;
    const heroImage = req.files.heroImage?.[0]?.filename;

    if (!name || !tagLine || !cardImage || !heroImage || !parentCategory) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newSubCategory = new SubCategory({
      name,
      tagLine,
      cardImage,
      heroImage,
      parentCategory
    });

    await newSubCategory.save();
    res.status(201).json({ message: "Subcategory uploaded successfully", subCategory: newSubCategory });
  } catch (error) {
    console.error("Subcategory upload error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate("parentCategory","name");
    res.status(200).json(subCategories);
  } catch (error) {
    console.error("Fetching subcategories failed:", error);
    res.status(500).json({ error: "Failed to fetch subcategories" });
  }
};

const getSubcategoriesById = async (req, res) => {
  const spec = req.query.spec || null;
  if(spec=="subcategory"){
    try{
      const {id} = req.params; 
      const subcategories = await SubCategory.find({_id : id})
      res.send(subcategories);
    }catch(err){console.log(err)}
  }
else
{  try{
  const {id} = req.params;
  const subCategories = await SubCategory.find({parentCategory: id}).select('name cardImage')
  res.send(subCategories);
}
catch(error){
  console.log(error);
}}
}

module.exports = { uploadSubCategory, getAllSubCategories, getSubcategoriesById };
