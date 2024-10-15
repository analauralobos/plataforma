const { Pago, PagoRealizado } = require("../models/pago.model.js"); 
const Cuota = require("../models/cuota.model.js");

// Obtener todos los pagos que deben realizarse
exports.getAllPagos = (req, res) => {
    Pago.getAllPagos((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Error al obtener los pagos."
            });
        } else res.send({ data });
    });
};
// Obtener todos los pagos que se han concretado
exports.getAllPagosRealizados = (req, res) => {
    PagoRealizado.getAllPagosRealizados((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Error al obtener los pagos realizados."
            });
        } else {
            res.send({ status: 200, data });
        }
    });
};

// Crear un nuevo pago si el socio no ha pagado nada o si ya pagó su año
exports.createPago = (req, res) => {
    // Validar la solicitud
    if (!req.body) {
        return res.status(400).send({
            message: "El contenido no puede estar vacío."
        });
    }

    const nuevoPago = new Pago({
        Fecha_Inicio: req.body.Fecha_Inicio,
        Fecha_Vencimiento: req.body.Fecha_Vencimiento,
        Cuotas_Pagadas: req.body.Cuotas_Pagadas,
        Monto_Total: req.body.Monto_Total,
        ID_Socio: req.body.ID_Socio,
        ID_Cuota: req.body.ID_Cuota,
        ID_Administrador: req.body.ID_Administrador
    });

    // Crear pago
    Pago.create(nuevoPago, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Error al crear el pago."
            });
        } else res.send(data);
    });
};

// Obtener un pago por ID
exports.getPagoById = (req, res) => {
    Pago.getPagoById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `No se encontró el pago con id ${req.params.id}.`
                });
            }
            return res.status(500).send({
                message: "Error al obtener el pago con id " + req.params.id
            });
        }
        res.send({ data });
    });
};


// Actualizar un pago por ID
exports.updatePago = (req, res) => {
    // Validar la solicitud
    if (!req.body) {
        return res.status(400).send({
            message: "El contenido no puede estar vacío."
        });
    }

    const id = req.params.id; // Obtener el ID de los parámetros de la URL
    const { Fecha_Inicio, Fecha_Vencimiento, Cuotas_Pagadas, Monto_Total } = req.body;

    // Crear un objeto con los campos que se van a actualizar
    const pagoActualizado = {
        Fecha_Inicio,
        Fecha_Vencimiento,
        Cuotas_Pagadas,
        Monto_Total
    };

    // Llama al método de actualización en el modelo
    Pago.update(id, pagoActualizado, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `No se encontró el pago con id ${id}.`
                });
            }
            res.status(500).send({
                message: "Error al actualizar el pago con id " + id
            });
        } else res.send(data);
    });
};



exports.pagarCuota = (req, res) => {
    const { ID_Pago, Cuotas_A_Pagar, Fecha_Pago, Metodo_Pago } = req.body;

    // Obtener el pago existente
    Pago.getPagoById(ID_Pago, (err, pago) => {
        if (err || !pago) {
            console.error("Error al obtener el pago:", err);
            res.status(404).send({ message: "Error al obtener el pago." });
            return;
        }

        // Obtener información de la cuota para calcular el monto
        Cuota.findById(pago.ID_Cuota, (err, cuota) => {
            if (err || !cuota) {
                res.status(500).send({ message: "Error al obtener los datos de la cuota." });
                return;
            }

            // Calcular monto total de cuotas a pagar
            let montoCuotas = cuota.Monto * Cuotas_A_Pagar;

            // Si la fecha de pago es posterior a la fecha de vencimiento, añadir recargo
            let recargo = 0;
            if (new Date(Fecha_Pago) > new Date(pago.Fecha_Vencimiento)) {
                recargo = cuota.Recargo; // Suponiendo que tienes un campo 'Recargo' en la tabla Cuota
            }

            const montoTotal = montoCuotas + recargo;

            // Actualizar la tabla `Pago`
            const pagoActualizado = {
                Cuotas_Pagadas: pago.Cuotas_Pagadas + Cuotas_A_Pagar,
                Monto_Total: pago.Monto_Total + montoTotal
            };

            Pago.update(ID_Pago, pagoActualizado, (err, updatedPago) => {
                if (err) {
                    res.status(500).send({ message: "Error al actualizar el pago." });
                    return;
                }

                // Insertar el nuevo pago en la tabla `PagoRealizado`
                const nuevoPagoRealizado = {
                    ID_Pago,
                    Cuotas_A_Pagar,
                    Monto: montoTotal,
                    Metodo_Pago,
                    Fecha_Pago,
                };

                PagoRealizado.create(nuevoPagoRealizado, (err, pagoRealizado) => {
                    if (err) {
                        res.status(500).send({ message: "Error al registrar el pago realizado." });
                        return;
                    }

                    res.status(200).send({
                        message: "Pago realizado exitosamente.",
                        pagoActualizado,
                        pagoRealizado
                    });
                });
            });
        });
    });
};
