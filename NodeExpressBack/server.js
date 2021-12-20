const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to our application." });
});

require("./app/routes/user.routes")(app);
require("./app/routes/allergen.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/ingredientType.routes")(app);
require("./app/routes/recipe.routes")(app);
require("./app/routes/unit.routes")(app);
require("./app/routes/ingredient.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});