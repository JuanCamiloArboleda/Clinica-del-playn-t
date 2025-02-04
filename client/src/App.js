import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function AddEmployee() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [roleId, setRoleId] = useState('');
  const [storeId, setStoreId] = useState('');
  const [salary, setSalary] = useState('');
  const [administratorId, setAdministratorId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3000/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_number: phoneNumber,
        id_role: roleId,
        id_store: storeId,
        salary: salary,
        administrator_id: administratorId || null,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Empleado creado exitosamente');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhoneNumber('');
      setRoleId('');
      setStoreId('');
      setSalary('');
      setAdministratorId('');
    } else {
      alert(`Error: ${data.error}`);
    }
  };

  return (
    <div className="App">
      <h1>Agregar Empleado</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label>
          Apellido:
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Teléfono:
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </label>
        <label>
          Rol ID:
          <input type="text" value={roleId} onChange={(e) => setRoleId(e.target.value)} />
        </label>
        <label>
          Store ID:
          <input type="text" value={storeId} onChange={(e) => setStoreId(e.target.value)} />
        </label>
        <label>
          Salario:
          <input type="text" value={salary} onChange={(e) => setSalary(e.target.value)} />
        </label>
        <label>
          Administrador ID:
          <input type="text" value={administratorId} onChange={(e) => setAdministratorId(e.target.value)} />
        </label>
        <button type="submit">Crear Empleado</button>
      </form>
      <Link to="/employees">Ver Lista de Empleados</Link>
    </div>
  );
}

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch('http://localhost:3000/employees');
      const data = await response.json();
      setEmployees(data);
    };

    fetchEmployees();
  }, []);

  return (
    <div className="App">
      <h1>Lista de Empleados</h1>
      <ul>
        {employees.map(employee => (
          <li key={employee.id}>
            {employee.first_name} {employee.last_name} - {employee.email}
          </li>
        ))}
      </ul>
      <Link to="/">Agregar Empleado</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<AddEmployee />} />
        <Route path="/employees" element={<EmployeeList />} />
      </Routes>
    </Router>
  );
}

export default App;