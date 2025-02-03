import { useState, useEffect } from 'react';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Importa el archivo CSS para estilos personalizados

const Home = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [join_access, setJoinAccess] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Solicitar permiso para notificaciones
    if (Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('Clinica del Playn\'t', {
            body: 'La página se ha cargado correctamente.',
          });
        }
      });
    } else if (Notification.permission === 'granted') {
      new Notification('Clinica del Playn\'t', {
        body: 'La página se ha cargado correctamente.',
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await signIn(email, join_access);
    if (error) {
      setError('Invalid email or join access');
    } else {
      setError(null);
      navigate('/dashboard'); // Navegar al Dashboard después de un inicio de sesión exitoso
    }
  };

  return (
    <div className="home-container">
      <h1>Clinica del Playn&apos;t</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Join Access"
          value={join_access}
          onChange={(e) => setJoinAccess(e.target.value)}
          required
        />
        <button type="submit" className="login-button">Sign In</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Home;