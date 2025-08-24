const express = require('express');
const Recipe = require('../modules/recipeSchema');
const router = express.Router();
const multer=require('multer');
const path=require('path');
const verifyToken=require('../middleware/auth')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const fillname = Date.now() + '-' + file.fieldname
    cb(null, fillname)
  }
})

const upload = multer({ storage: storage })




router.post('/', upload.single('coverImage') ,verifyToken, async (req, res) => {
    console.log(req.user);
    const { title, ingredients, instructions } = req.body;
    if (!title || !ingredients || !instructions) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const newRecipe = await Recipe.create({
        title,
        ingredients,
        instructions,
        coverImage: req.file ?.filename ,
        createdBy: req.user.id

    });
    res.status(201).json(newRecipe);
});
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({ error: "Recipe not found" });
        }
        res.status(200).json(recipe)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" })
    }
})


router.put('/:id',upload.single('coverImage'), async (req, res) => {
    const { id } = req.params;
    const { title, ingredients, instructions } = req.body;
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, {
            title,
            ingredients,
            instructions,
            coverImage: req.file ?.filename
        }, {
            new: true,
            runValidators: true
        });
        if (!updatedRecipe) {
            return res.status(404).json({ error: "Recipe not found" });
        }
        res.status(200).json(updatedRecipe);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" })
    }

})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(id);
        if (!deletedRecipe) {
            return res.status(404).json({ error: "Recipe not found" });
        }
        res.status(204).json();
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" })
    }
})

module.exports = router;
