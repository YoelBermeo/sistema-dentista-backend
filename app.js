import express from "express";
import cors from "cors";
import {
  actualizarPaciente,
  obtenerPacientePorId,
  eliminarPaciente,
  insertarPaciente,
  obtenerPacientes,
} from "./db/paciente.js";

import {
  obtenerMedicamentos,
  insertarMedicamento,
  obtenerMedicamentoPorId,
  actualizarMedicamento,
  eliminarMedicamento,
} from "./db/medicamento.js";

const app = express();
app.use(express.json()); // Middleware para parsear JSON
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

app.get("/", async (req, res) => {
  res.send("Hello World");
});

//paciente
app.get("/pacientes", obtenerPacientes);
app.get("/paciente/:id", obtenerPacientePorId);
app.post("/add-paciente", insertarPaciente);
app.put("/actualizar-paciente/:id", actualizarPaciente);
app.delete("/eliminar-paciente/:id", eliminarPaciente);

//medicamento
app.get("/medicamentos", obtenerMedicamentos);
app.get('/medicamento/:id', obtenerMedicamentoPorId);
app.post('/add-medicamento', insertarMedicamento);
app.put('/actualizar-medicamento/:id', actualizarMedicamento);
app.delete('/eliminar-medicamento/:id', eliminarMedicamento);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
