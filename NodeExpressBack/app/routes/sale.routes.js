module.exports = app => {
    const sale = require("../controllers/sale.controller.js");

    var router = require("express").Router();

    // Retrieve all Sales
    router.get("/", sale.findAll);

    //Retrieve all Sales in an Intervall
    router.get("/between", sale.findAllInIntervall)

    // Retrieve a single Sale with id
    router.get("/:id", sale.findOne);

    app.use('/api/sale', router);
};