const sql = require("../db/db.js");

// Constructor para Pago
const Pago = function (pago) {
    this.Fecha_Inicio = pago.Fecha_Inicio;
    this.Fecha_Vencimiento = pago.Fecha_Vencimiento;
    this.Cuotas_Pagadas = pago.Cuotas_Pagadas; 
    this.Monto_Total = pago.Monto_Total;
    this.ID_Socio = pago.ID_Socio;
    this.ID_Cuota = pago.ID_Cuota;
    this.ID_Administrador = pago.ID_Administrador;
};

// Constructor para PagoRealizado
const PagoRealizado = function (pago_realizado) {
    this.ID_Pago_Socio = pago_realizado.ID_Pago_Socio;
    this.Fecha_Pago = pago_realizado.Fecha_Pago;
    this.Cuotas_Pagadas = pago_realizado.Cuotas_Pagadas;
    this.Monto = pago_realizado.Monto;
    this.Metodo_Pago = pago_realizado.Metodo_Pago;
    this.ID_Pago = pago_realizado.ID_Pago;
    this.Cuotas_A_Pagar = pago_realizado.Cuotas_A_Pagar;
};

// Método para obtener todos los pagos
Pago.getAllPagos = (result) => {
    let query = "SELECT * FROM pago";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("pagos: ", res);
        result(null, res);
    });
};

// Método para obtener todos los pagos realizados
PagoRealizado.getAllPagosRealizados = (result) => {
    let query = "SELECT * FROM pago_realizado";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("pagos realizados: ", res);
        result(null, res);
    });
};

// Método para obtener un pago por ID
Pago.getPagoById = (pagoId, result) => {
    sql.query("SELECT * FROM pago WHERE ID_Pago = ?", [pagoId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.length) {
            console.log("Pago encontrado: ", res[0]);
            result(null, res[0]); // Devuelve el primer resultado
            return;
        }

        // Si no se encuentra el pago, devolver null
        result({ kind: "not_found" }, null);
    });
};



// Método para crear un nuevo pago
Pago.create = (newPago, result) => {
    sql.query("INSERT INTO pago SET ?", newPago, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Pago creado: ", { id: res.insertId, ...newPago });
        result(null, { id: res.insertId, ...newPago });
    });
};

// Método para actualizar un pago
Pago.update = (id, pagoActualizado, result) => {
    sql.query(
        "UPDATE pago SET Fecha_Inicio = ?, Fecha_Vencimiento = ?, Cuotas_Pagadas = ?, Monto_Total = ? WHERE ID_Pago = ?",
        [pagoActualizado.Fecha_Inicio, pagoActualizado.Fecha_Vencimiento, pagoActualizado.Cuotas_Pagadas, pagoActualizado.Monto_Total, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // Si no se encuentra el pago, devolver null
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("Pago actualizado: ", { id: id, ...pagoActualizado });
            result(null, { id: id, ...pagoActualizado });
        }
    );
};


// Método para crear un nuevo pago realizado

PagoRealizado.create = (newPagoRealizado, result) => {
    sql.query("INSERT INTO pago_realizado SET ?", newPagoRealizado, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Pago realizado registrado: ", { id: res.insertId, ...newPagoRealizado });
        result(null, { id: res.insertId, ...newPagoRealizado });
    });
};



// Exportar el modelo Pago y PagoRealizado
module.exports = {
    Pago,
    PagoRealizado
};

