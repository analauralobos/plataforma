const sql = require("../db/db.js");

// Constructor para Cuota
const Cuota = function (cuota) {
    this.ID_Cuota = cuota.ID_Cuota;
    this.Tipo = cuota.Tipo;
    this.Monto = cuota.Monto;
    this.Cantidad = cuota.Cantidad;
    this.Fecha_Vencimiento = cuota.Fecha_Vencimiento;
    this.ID_Administrador = cuota.ID_Administrador;
};

// Método para obtener todas las cuotas
Cuota.getAll = (result) => {
    let query = "SELECT * FROM cuota";
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

// Método para obtener una cuota por ID
Cuota.findById = (id, result) => {
    let query = "SELECT * FROM cuota WHERE ID_Cuota = ?";
    sql.query(query, [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

// Método para actualizar una cuota por ID
Cuota.updateById = (id, cuota, result) => {
    sql.query(
        "UPDATE cuota SET Tipo = ?, Monto = ?, Cantidad = ?, Fecha_Vencimiento = ?, ID_Administrador = ? WHERE ID_Cuota = ?",
        [cuota.Tipo, cuota.Monto, cuota.Cantidad, cuota.Fecha_Vencimiento, cuota.ID_Administrador, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { id: id, ...cuota });
        }
    );
};

module.exports = Cuota;
