const db = require("../models");
const Cost = db.cost;
const Op = db.Sequelize.Op;

// Create and Save a new Cost
exports.create = (req, res) => {
    // Validate request
    if (!req.body.hourlyEmployeeCost || !req.body.hourlyFluidCost || !req.body.multiplierCoefficient) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Cost
    const cost = {
        hourlyEmployeeCost: req.body.hourlyEmployeeCost,
        hourlyFluidCost: req.body.hourlyFluidCost,
        multiplierCoefficient: req.body.multiplierCoefficient
    };

    // Save Cost in the database
    Cost.create(cost)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Cost."
            });
        });
};

// Retrieve all Costs from the database.
exports.findAll = (req, res) => {
    Cost.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Some error occurred while retrieving costs."
            })
        })
};

// Find a single Cost with an id
exports.findOne = (req, res) => {
    const codeCost = req.params.id;
    Cost.findByPk(codeCost)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Cost with code=${codeCost}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Cost with code=" + codeCost
            });
        });
};

// Update a Cost by the id in the request
exports.update = (req, res) => {
    const codeCost = req.params.id;

    Cost.update(req.body, {
        where: { codeCost: codeCost }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Cost was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Cost with code=${codeCost}. Maybe Cost was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Cost with code=" + codeCost
            });
        });
};

// Delete a Cost with the specified id in the request
exports.delete = (req, res) => {
    const codeCost = req.params.id;

    Cost.destroy({
        where: { codeCost: codeCost }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Cost was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Cost with code=${codeCost}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Cost with code=" + codeCost
            });
        });
};