import { pool } from './db.js';

export const insertarPaciente = async (req, res) => {
  const client = await pool.connect();

  try {
    const text = `INSERT INTO tb_paciente(nombre, edad, direccion, genero, email, telefono, observaciones) 
    VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    // const values = ['Juan', 30, 'Quitumbe', 'Masculino', 'juan@google.com', '0994356343', 'Ninguno'];
    const { nombre, edad, direccion, genero, email, telefono, observaciones } = req.body;
    const values = [nombre, edad, direccion, genero, email, telefono, observaciones];

    const result = await client.query(text, values);
    // console.log('Insertado:', result.rows[0]);

    return res.json({
      ok: true,
      paciente: result.rows[0],
    });

  } catch (err) {
    console.error('Error ejecutando la consulta', err.stack);
    res.json({
      ok: false,
      error: 'Error insertando paciente',
    });
  } finally {
    client.release();
  }
};

export const obtenerPacientes = async (req, res) => {
  const client = await pool.connect();

  try {
    const text = `SELECT * FROM tb_paciente`;

    const result = await client.query(text);

    return res.json({
      ok: true,
      pacientes: result.rows,
    });

  } catch (err) {
    console.error('Error ejecutando la consulta', err.stack);
    res.json({
      ok: false,
      error: 'Error obteniendo pacientes',
    });
  } finally {
    client.release();
  }
};

export const obtenerPacientePorId = async (req, res) => {
  const client = await pool.connect();

  try {
    const text = `SELECT * FROM tb_paciente WHERE id = $1`;
    const { id } = req.params;
    const values = [id];

    const result = await client.query(text, values);

    if (result.rowCount === 0) {
      return res.json({
        ok: false,
        error: 'Paciente no encontrado',
      });
    }

    return res.json({
      ok: true,
      paciente: result.rows[0],
    });

  } catch (err) {
    console.error('Error ejecutando la consulta', err.stack);
    res.json({
      ok: false,
      error: 'Error obteniendo paciente',
    });
  } finally {
    client.release();
  }
};

export const actualizarPaciente = async (req, res) => {
  const client = await pool.connect();

  try {

    const { id } = req.params;

    if(!id) {
      return res.json({
        ok: false,
        error: 'No se encontro el id',
      });
    }

    const text = `UPDATE tb_paciente 
                  SET nombre = $1, edad = $2, direccion = $3, genero = $4, email = $5, telefono = $6, observaciones = $7 
                  WHERE id = $8 RETURNING *`;
    const { nombre, edad, direccion, genero, email, telefono, observaciones } = req.body;
    const values = [nombre, edad, direccion, genero, email, telefono, observaciones, id];

    const result = await client.query(text, values);

    if (result.rowCount === 0) {
      return res.json({
        ok: false,
        error: 'Paciente no encontrado',
      });
    }

    return res.json({
      ok: true,
      paciente: result.rows[0],
    });

  } catch (err) {
    console.error('Error ejecutando la consulta', err.stack);
    res.json({
      ok: false,
      error: 'Error actualizando paciente',
    });
  } finally {
    client.release();
  }
};

export const eliminarPaciente = async (req, res) => {
  const client = await pool.connect();

  try {
    // Obtener el id desde los parámetros de la ruta
    const { id } = req.params;

    if(!id) {
      return res.json({
        ok: false,
        error: 'No se encontro el id',
      });
    }

    const text = `DELETE FROM tb_paciente WHERE id = $1`;
    const values = [id];

    await client.query(text, values);

    return res.json({
      ok: true,
    });

  } catch (err) {
    console.error('Error ejecutando la consulta', err.stack);
    res.json({
      ok: false,
      error: 'Error eliminando el paciente',
    });
  } finally {
    client.release();
  }
};
