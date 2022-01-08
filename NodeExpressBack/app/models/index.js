const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,{
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    define: {
        timestamps: false
    },
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.allergen = require("./allergen.model.js")(sequelize, Sequelize);
db.category = require("./category.model.js")(sequelize, Sequelize);
db.ingredientType = require("./ingredientType.model.js")(sequelize, Sequelize);
db.recipe = require("./recipe.model.js")(sequelize, Sequelize);
db.ingredient = require("./ingredient.model.js")(sequelize, Sequelize);
db.unit = require("./unit.model.js")(sequelize, Sequelize);
db.descriptionStep = require("./descriptionStep.model.js")(sequelize, Sequelize);
db.generalStep = require("./generalStep.model.js")(sequelize, Sequelize);
db.cost = require("./cost.model.js")(sequelize, Sequelize);
db.ingredientInStep = require("./ingredientInStep.model")(sequelize, Sequelize);
db.sale = require("./sale.model")(sequelize, Sequelize);

//CLE ETRANGERE
db.user.hasMany(db.recipe,{foreignKey: "numUser"});
db.recipe.belongsTo(db.user,{foreignKey: "numUser"});

db.category.hasMany(db.recipe, {foreignKey: "idCategory"});
db.recipe.belongsTo(db.category, {foreignKey: "idCategory"});

db.allergen.hasMany(db.ingredient, {foreignKey: "codeAllergen"});
db.ingredient.belongsTo(db.allergen, {foreignKey: "codeAllergen"});

db.ingredientType.hasMany(db.ingredient, {foreignKey: "idType"});
db.ingredient.belongsTo(db.ingredientType, {foreignKey: "idType"});

db.unit.hasMany(db.ingredient, {foreignKey: "idUnit"});
db.ingredient.belongsTo(db.unit, {foreignKey: "idUnit"});

db.descriptionStep.hasOne(db.generalStep, {foreignKey: "numDescriptionStep"});
db.recipe.hasMany(db.generalStep, {foreignKey : "recipeStep"});
db.generalStep.belongsTo(db.descriptionStep, {foreignKey: "numDescriptionStep"});
db.generalStep.belongsTo(db.recipe, {foreignKey : "recipeStep"});

db.recipe.hasMany(db.generalStep, {foreignKey: "proprietaryRecipe",as:"ProprietaryStep"});
db.generalStep.belongsTo(db.recipe, {foreignKey: "proprietaryRecipe", as:"PRecipe"});

db.cost.hasMany(db.recipe, {foreignKey: "numCost"});
db.recipe.belongsTo(db.cost, {foreignKey: "numCost"});

db.ingredient.belongsToMany(db.descriptionStep, {through: db.ingredientInStep, foreignKey: "numIngredient"});
db.descriptionStep.belongsToMany(db.ingredient, {through: db.ingredientInStep, foreignKey: "numDescriptionStep"});

db.recipe.hasMany(db.sale, {foreignKey: "numRecipe"});
db.sale.belongsTo(db.recipe, {foreignKey: "numRecipe"});

module.exports = db;