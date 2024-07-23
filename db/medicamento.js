import { pool } from './db.js';

export const insertarMedicamento = async (req, res) => {
  const client = await pool.connect();

  try {
    const text = `INSERT INTO tb_medicamento(nombre, descripcion, indicaciones, contradicciones, dosis) 
    VALUES($1, $2, $3, $4, $5) RETURNING *`;

    const { nombre, descripcion, indicaciones, contradicciones, dosis } = req.body;
    const values = [nombre, descripcion, indicaciones, contradicciones, dosis];

    const result = await client.query(text, values);

    return res.json({
      ok: true,
      medicamento: result.rows[0],
    });

  } catch (err) {
    console.error('Error ejecutando la consulta', err.stack);
    res.json({
      ok: false,
      error: 'Error insertando medicamento',
    });
  } finally {
    client.release();
  }
};

export const obtenerMedicamentos = async (req, res) => {
  const client = await pool.connect();

  try {
    const text = `SELECT * FROM tb_medicamento`;

    const result = await client.query(text);

    return res.json({
      ok: true,
      medicamentos: result.rows,
    });

  } catch (err) {
    console.error('Error ejecutando la consulta', err.stack);
    res.json({
      ok: false,
      error: 'Error obteniendo medicamentos',
    });
  } finally {
    client.release();
  }
};

export const obtenerMedicamentoPorId = async (req, res) => {
  const client = await pool.connect();

  try {
    const medicamentoId = parseInt(req.params.id); // Obtén el ID desde los parámetros de consulta

    if (isNaN(medicamentoId)) {
      return res.status(400).json({
        ok: false,
        error: 'ID del medicamento inválido',
      });
    }

    const text = `SELECT * FROM tb_medicamento WHERE id = $1`;

    const result = await client.query(text, [medicamentoId]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        ok: false,
        error: 'Medicamento no encontrado',
      });
    }

    return res.json({
      ok: true,
      medicamento: result.rows[0],
    });

  } catch (err) {
    console.error('Error ejecutando la consulta', err.stack);
    res.json({
      ok: false,
      error: 'Error obteniendo medicamento',
    });
  } finally {
    client.release();
  }
};


export const actualizarMedicamento = async (req, res) => {
  const client = await pool.connect();

  try {
    const medicamentoId = parseInt(req.params.id); // Obtén el ID desde los parámetros de consulta

    if (isNaN(medicamentoId)) {
      return res.status(400).json({
        ok: false,
        error: 'ID del medicamento inválido',
      });
    }

    const text = `UPDATE tb_medicamento 
                   SET nombre = $1, descripcion = $2, indicaciones = $3, contradicciones = $4, dosis = $5 
                   WHERE id = $6 RETURNING *`;

    const { nombre, descripcion, indicaciones, contradicciones, dosis } = req.body;
    const values = [nombre, descripcion, indicaciones, contradicciones, dosis, medicamentoId];

    const result = await client.query(text, values);

    if (result.rowCount === 0) {
      return res.status(404).json({
        ok: false,
        error: 'Medicamento no encontrado',
      });
    }

    return res.json({
      ok: true,
      medicamento: result.rows[0],
    });

  } catch (err) {
    console.error('Error ejecutando la consulta', err.stack);
    res.json({
      ok: false,
      error: 'Error actualizando medicamento',
    });
  } finally {
    client.release();
  }
};

export const eliminarMedicamento = async (req, res) => {
  const client = await pool.connect();

  try {
    const medicamentoId = parseInt(req.params.id); // Obtén el ID desde los parámetros de consulta

    if (isNaN(medicamentoId)) {
      return res.status(400).json({
        ok: false,
        error: 'ID del medicamento inválido',
      });
    }

    const text = `DELETE FROM tb_medicamento WHERE id = $1 RETURNING *`;

    const result = await client.query(text, [medicamentoId]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        ok: false,
        error: 'Medicamento no encontrado',
      });
    }

    return res.json({
      ok: true,
      mensaje: 'Medicamento eliminado exitosamente',
    });

  } catch (err) {
    console.error('Error ejecutando la consulta', err.stack);
    res.json({
      ok: false,
      error: 'Error eliminando medicamento',
    });
  } finally {
    client.release();
  }
};
