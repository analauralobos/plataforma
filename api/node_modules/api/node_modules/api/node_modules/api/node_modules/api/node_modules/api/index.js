const express = require("express");
const cors = require("cors");

// Controladores
const UsuarioController = require('./controllers/user.controller.js');  // Este se usa para Usuario y Persona
const Cuota = require('./controllers/cuota.controller.js');  // Controlador de Cuotas
const PagoController = require('./controllers/pago.controller.js');  // Controlador de Pagos

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba
app.get("/", (req, res) => {
    res.json({ message: "Hola, soy el API Node." });
});

// Rutas para Administrador y Persona
app.get("/administrador", UsuarioController.list);  // Lista de administradores
app.get("/personas", UsuarioController.listPersonas);  // Lista de personas
app.get("/personas/socios", UsuarioController.listSocios);  // Lista de socios
app.get("/personas/abonados", UsuarioController.listAbonados);  // Lista de abonados
app.post("/personas", UsuarioController.createPersona);  // Crear una nueva persona
app.put("/personas/:nro_socio", UsuarioController.updatePersona);  // Actualizar una persona
app.delete("/personas/:nro_socio", UsuarioController.deletePersona);  // Eliminar una persona

// Rutas para Cuotas
app.get("/cuotas", Cuota.findAll);  // Obtener todas las cuotas
app.get("/cuotas/:id", Cuota.findOne);  // Obtener una cuota por ID
app.put("/cuotas/:id", Cuota.update);  // Actualizar una cuota por ID

// Rutas para Pagos
app.get("/pagos", PagoController.getAllPagos);  // Obtener todos los pagos
app.post("/pagos", PagoController.createPago);  // Crear un nuevo pago
app.get("/pagos/:id", PagoController.getPagoById);  // Obtener un pago por ID
app.put("/pagos/:id", PagoController.updatePago);  // Actualizar un pago por ID
app.get("/pagosrealizados", PagoController.getAllPagosRealizados);  // Obtener todos los pagos realizados
app.post("/pagosrealizados", PagoController.pagarCuota);  // Obtener todos los pagos realizados

// Setear el puerto y escuchar las solicitudes
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
