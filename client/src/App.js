import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

async function fetchEmployees() {
  try {
    const response = await fetch('http://localhost:3001/employees');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Response is not an array');
    }
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return [];
  }
}

function AddEmployee({ getEmpleados }) {
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
    const response = await fetch('http://localhost:3001/employees', {
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
      getEmpleados(); // Llamar a getEmpleados para actualizar la lista
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
    const getEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3001/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    getEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/employees/${id}`);
      setEmployees(employees.filter(employee => employee.id !== id));
    } catch (error) {
      console.error('There was a problem with the delete operation:', error);
    }
  };

  return (
    <div className="App">
      <h1>Lista de Empleados</h1>
      <ul>
        {employees.map(employee => (
          <li key={employee.id}>
            {employee.first_name} {employee.last_name} - {employee.email}
            <button onClick={() => deleteEmployee(employee.id)}>Eliminar</button>
            <Link to={`/employees/${employee.id}`}>Detalles</Link>
            <Link to={`/employees/update/${employee.id}`}>Actualizar</Link>
          </li>
        ))}
      </ul>
      <Link to="/">Agregar Empleado</Link>
    </div>
  );
}

function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    getEmployee();
  }, [id]);

  if (!employee) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="App">
      <h1>Detalles del Empleado</h1>
      <p>Nombre: {employee.first_name} {employee.last_name}</p>
      <p>Email: {employee.email}</p>
      <p>Teléfono: {employee.phone_number}</p>
      <p>Rol: {employee.Role?.name}</p>
      <p>Tienda: {employee.Stores?.name}</p>
      <Link to="/employees">Volver a la Lista de Empleados</Link>
    </div>
  );
}

function UpdateEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    id_role: '',
    id_store: '',
    salary: '',
    administrator_id: ''
  });

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    getEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/employees/${id}`, employee);
      navigate('/employees');
    } catch (error) {
      console.error('There was a problem with the update operation:', error);
    }
  };

  return (
    <div className="App">
      <h1>Actualizar Empleado</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="first_name" value={employee.first_name} onChange={handleChange} />
        </label>
        <label>
          Apellido:
          <input type="text" name="last_name" value={employee.last_name} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={employee.email} onChange={handleChange} />
        </label>
        <label>
          Teléfono:
          <input type="text" name="phone_number" value={employee.phone_number} onChange={handleChange} />
        </label>
        <label>
          Rol ID:
          <input type="text" name="id_role" value={employee.id_role} onChange={handleChange} />
        </label>
        <label>
          Store ID:
          <input type="text" name="id_store" value={employee.id_store} onChange={handleChange} />
        </label>
        <label>
          Salario:
          <input type="text" name="salary" value={employee.salary} onChange={handleChange} />
        </label>
        <label>
          Administrador ID:
          <input type="text" name="administrator_id" value={employee.administrator_id} onChange={handleChange} />
        </label>
        <button type="submit">Actualizar Empleado</button>
      </form>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<AddEmployee />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/:id" element={<EmployeeDetails />} />
        <Route path="/employees/update/:id" element={<UpdateEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;