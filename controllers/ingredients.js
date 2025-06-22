const router= require('express').Router();
const Ingredient=require('../models/ingredient');

/*--------------------------------CRUD -1- Create ----------------------------------*/
router.get('/',async(req,res)=>{
    const ingredients= await Ingredient.find();
    res.render('ingredients/index.ejs',{ingredients});
});

// to add new ingredients

router.post('/', async(req,res)=>{
    await Ingredient.create(req.body)
    res.redirect('/ingredients')
})

//
router.delete('/:ingredientId',async(req,res)=>{
    await Ingredient.findByIdAndDelete(req.params.ingredientId);
    res.redirect('/ingredients')
})







module.exports= router;