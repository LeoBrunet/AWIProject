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
db.ingredientType = require("./ingredientType.js")(sequelize, Sequelize);
db.recipe = require("./recipe.model.js")(sequelize, Sequelize);
db.ingredient = require("./ingredient.model.js")(sequelize, Sequelize);
db.unit = require("./unit.model")(sequelize, Sequelize);


//CLE ETRANGERE
db.user.hasMany(db.recipe,{foreignKey: "numUser"});
db.recipe.belongsTo(db.user,{foreignKey: "numUser"});

db.category.hasMany(db.recipe, {foreignKey: "labelCategory"});
db.recipe.belongsTo(db.category, {foreignKey: "labelCategory"});

db.allergen.hasMany(db.ingredient, {foreignKey: "codeAllergen"});
db.ingredient.belongsTo(db.allergen, {foreignKey: "codeAllergen"});

db.ingredientType.hasMany(db.ingredient, {foreignKey: "labelType"});
db.ingredient.belongsTo(db.ingredientType, {foreignKey: "labelType"});

db.unit.hasMany(db.ingredient, {foreignKey: "labelUnite"});
db.ingredient.belongsTo(db.unit, {foreignKey: "labelUnite"});

module.exports = db;