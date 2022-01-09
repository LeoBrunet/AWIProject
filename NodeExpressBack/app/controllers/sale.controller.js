const db = require("../models");
const Sale = db.sale;
const Recipe = db.recipe;
const Op = db.Sequelize.Op;

// Retrieve all Sales from the database.
exports.findAll = (req, res) => {
    Sale.findAll({order: [
            ['saleDate', 'DESC']
        ], include: Recipe})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Some error occurred while retrieving sales."
            })
        })
};

// Find a single Sale with an id
exports.findOne = (req, res) => {
    const codeSale = req.params.id;
    Sale.findByPk(codeSale)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Sale with code=${codeSale}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Sale with code=" + codeSale
            });
        });
};

// Retrieve all Sales from the database.
exports.findAllInIntervall = (req, res) => {
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    Sale.findAll({
        order: [
            ['saleDate', 'DESC']
        ],
        where: {[Op.between]: [startDate, endDate]}
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Some error occurred while retrieving sales."
            })
        })
};
