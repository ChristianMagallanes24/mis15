import React, { useState, useEffect } from 'react';
import './App.css';
import videoSource from './assets/video.mp4';

function App() {
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [confirmacion, setConfirmacion] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarConfirmacion(true);
    }, 43000); // 43 segundos

    return () => clearTimeout(timer);
  }, []);

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleApellidoChange = (event) => {
    setApellido(event.target.value);
  };

  const handleConfirmacionChange = (event) => {
    setConfirmacion(event.target.value);
  };

  const handleConfirmar = () => {
    const mensaje = `Confirmación de asistencia de ${nombre} ${apellido}. Confirmación: ${confirmacion}`;
    const numeroWhatsApp = 'tu_numero_de_whatsapp';
    const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    window.open(enlaceWhatsApp, '_blank');
  };

  return (
    <div className="App">
      {/* Video */}
      <video autoPlay loop muted playsInline className="video-background">
        <source src={videoSource} type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </video>

      {/* Confirmación de asistencia después de 43 segundos */}
      {mostrarConfirmacion && (
        <div className='confirmar-asistencia'>
          <h2>Confirmar Asistencia</h2>
          <form>
            <label>
              Nombre:
              <input type="text" value={nombre} onChange={handleNombreChange} />
            </label>
            <br />
            <label>
              Apellido:
              <input type="text" value={apellido} onChange={handleApellidoChange} />
            </label>
            <br />
            <label>
              Confirmación:
              <select value={confirmacion} onChange={handleConfirmacionChange}>
                <option value="">Seleccione...</option>
                <option value="Si">Sí, asistiré</option>
                <option value="No">No podré asistir</option>
              </select>
            </label>
            <br />
            <button type="button" onClick={handleConfirmar}>Confirmar</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
