const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();

// Middlewares
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");
const passUserToView = require('./middleware/pass-user-to-view');//for auth.
const isSignedIn = require('./middleware/is-signed-in');//for auth.

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000"; //either specify it in env 
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Session Configurations
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passUserToView);

// Render the first Page Homepage
app.get("/", async(req, res) => {
  res.render("index.ejs");
});

// Require Controller
const authController = require("./controllers/auth");
const recipeController= require('./controllers/recipes');
const ingredientController= require('./controllers/ingredients');
app.use("/auth", authController);
app.use('/recipes',isSignedIn,recipeController);
app.use('/ingredients',isSignedIn,ingredientController);





app.listen(port, () => {
  console.log(`The express app is ready on port http://localhost:${port}`);
});