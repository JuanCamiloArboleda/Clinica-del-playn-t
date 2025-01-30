const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

// Configurar Supabase
const supabaseUrl = 'https://lcutxyszjjfnltremqhb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjdXR4eXN6ampmbmx0cmVtcWhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyMDAwNDEsImV4cCI6MjA1Mzc3NjA0MX0.ugnI0WFXgptWAFmbPtXa0PxsnnX7KxR4KsM8rrwMZdI';
const supabase = createClient(supabaseUrl, supabaseKey);

// Crear aplicación Express
const app = express();
app.use(cors({
  origin: 'http://localhost:3001' // Permitir solicitudes desde el cliente
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('El servidor está funcionando');
});

// Ruta para obtener todos los empleados
app.get('/employees', async (req, res) => {
  const { data, error } = await supabase
    .from('Employees')
    .select('*');
  
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});