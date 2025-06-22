/*-------------------------------- Constent	----------------------------------*/
const router= require('express').Router();
const Recipe=require('../models/recipe');
const Ingredient=require('../models/ingredient');

/*--------------------------------CRUD -1- Create ----------------------------------*/
//Show the Index page of the Recipes
router.get('/',async(req,res)=>{
    const recipes= await Recipe.find().populate('owner');
    res.render('recipes/index.ejs',{recipes});
})

//Add New
router.get('/new',async(req,res)=>{
    const ingredients= await Ingredient.find();
    res.render('recipes/new.ejs',{ingredients})
})

router.post('/',async(req,res)=>{
    req.body.owner=req.session.user._id;
    await Recipe.create(req.body);
    res.redirect('/recipes');
})
/*--------------------------------CRUD -2- Read one ----------------------------------*/
router.get('/:recipeId',async(req,res)=>{
    const recipe= await Recipe.findById(req.params.recipeId)
    .populate('owner')
    .populate('ingredients');
    res.render('recipes/show.ejs',{recipe})
})

/*--------------------------------CRUD -3- Update ----------------------------------*/
router.get('/:recipeId/edit',async(req,res)=>{
    const recipe= await Recipe.findById(req.params.recipeId)
    .populate('owner')
    .populate('ingredients');
    const allIngredients= await Ingredient.find();
    res.render('recipes/edit.ejs',{recipe, allIngredients})
})


router.put('/:recipeId',async(req,res)=>{
     const recipe= await Recipe.findById(req.params.recipeId);
     if(req.session.user._id==recipe.owner._id){
        await Recipe.findByIdAndUpdate(req.body.recipeId);
        res.redirect('/recipes');
     }else{
        res.redirect('/recipes');
     }
})

/*--------------------------------CRUD -4- Delete ----------------------------------*/
router.delete('/:recipeId',async(req,res)=>{
    const recipe= await Recipe.findById(req.params.recipeId).populate('owner');
         if(req.session.user._id==recipe.owner._id){
        await recipe.deleteOne(req.body);
        res.redirect('/recipes');
     }else{
        res.redirect('/');
     }
})

module.exports= router;