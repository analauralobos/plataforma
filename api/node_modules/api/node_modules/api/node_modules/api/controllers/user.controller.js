const { Usuario: Usuario, Persona } = require("../models/user.model.js");

// Función para listar todos los administradores
exports.list = (req, res) => {
  Usuario.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error al buscar los administradores."
      });
    else res.send({ status: 200, data });
  });
};

// Función para listar todas las personas
exports.listPersonas = (req, res) => {
  Persona.getAllPersonas((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error al buscar las personas."
      });
    else res.send({ status: 200, data });
  });
};

// Función para listar los socios
exports.listSocios = (req, res) => {
  Persona.getSocios((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error al buscar los socios."
      });
    else res.send({ status: 200, data });
  });
};

// Función para listar los abonados
exports.listAbonados = (req, res) => {
  Persona.getAbonados((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error al buscar los abonados."
      });
    else res.send({ status: 200, data });
  });
};

// Función para crear una nueva persona
exports.createPersona = (req, res) => {
    const nuevaPersona = new Persona(req.body); // Crea una nueva instancia de Persona con los datos del cuerpo de la solicitud

    // Verifica que los datos sean válidos 
    if (!nuevaPersona.apellido_nombre || !nuevaPersona.documento) {
        return res.status(400).send({
            message: "El nombre y el documento son requeridos."
        });
    }

    // Llama al método create del modelo Persona
    Persona.create(nuevaPersona, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Error al crear la persona."
            });
        } else {
            res.status(201).send({
                status: 201,
                message: "Persona creada exitosamente.",
                data: data
            });
        }
    });
};

// Función para editar una persona (socio)
exports.updatePersona = (req, res) => {
  const nro_socio = req.params.nro_socio;
  const updatedData = req.body;

  Persona.update(nro_socio, updatedData, (err, data) => {
      if (err) {
          res.status(500).send({
              message: err.message || "Error al actualizar el socio."
          });
      } else {
          res.send({ status: 200, message: "Socio actualizado exitosamente", data });
      }
  });
};

// Función para eliminar una persona (socio)
exports.deletePersona = (req, res) => {
  const nro_socio = req.params.nro_socio;

  Persona.remove(nro_socio, (err, data) => {
      if (err) {
          res.status(500).send({
              message: err.message || "Error al eliminar el socio."
          });
      } else {
          res.send({ status: 200, message: "Socio eliminado exitosamente" });
      }
  });
};
