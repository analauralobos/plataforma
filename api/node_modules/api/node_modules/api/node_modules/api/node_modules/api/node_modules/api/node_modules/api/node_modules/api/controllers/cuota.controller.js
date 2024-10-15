const Cuota = require("../models/cuota.model.js");

// Obtener todas las cuotas
exports.findAll = (req, res) => {
    Cuota.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Error al obtener las cuotas."
            });
        } else {
            res.send(data);
        }
    });
};
// Obtener una cuota por ID
exports.findOne = (req, res) => {
    Cuota.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No se encontró la cuota con ID ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error al obtener la cuota con ID " + req.params.id
                });
            }
        } else {
            res.send(data);
        }
    });
};

// Actualizar una cuota por ID
exports.update = (req, res) => {
    Cuota.updateById(req.params.id, new Cuota(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No se encontró la cuota con ID ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error al actualizar la cuota con ID " + req.params.id
                });
            }
        } else {
            res.send(data);
        }
    });
};
