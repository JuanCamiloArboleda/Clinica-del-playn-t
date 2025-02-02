const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Ruta para obtener todos los empleados
app.get('/employees', async (req, res) => {
  const { data, error } = await supabase
    .from('Employees')
    .select('*, Role(name), Stores(name)');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Ruta para obtener un empleado por ID
app.get('/employees/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('Employees')
    .select('*, Role(name), Stores(name)')
    .eq('id', id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Ruta para crear un nuevo empleado
app.post('/employees', async (req, res) => {
  const { first_name, last_name, email, phone_number, id_role, id_store, salary, administrator_id } = req.body;

  const { data, error } = await supabase
    .from('Employees')
    .insert([{ first_name, last_name, email, phone_number, id_role, id_store, salary, administrator_id: administrator_id || null }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Ruta para actualizar un empleado por ID
app.put('/employees/:id', async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, phone_number, id_role, id_store, salary, administrator_id } = req.body;

  const { data, error } = await supabase
    .from('Employees')
    .update({ first_name, last_name, email, phone_number, id_role, id_store, salary, administrator_id: administrator_id || null })
    .eq('id', id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ message: 'Empleado actualizado exitosamente', data });
});

// Ruta para eliminar un empleado por ID
app.delete('/employees/:id', async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('Employees')
    .delete()
    .eq('id', id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ message: 'Empleado eliminado exitosamente', data });
});