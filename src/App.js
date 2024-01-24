import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import videoSource from './assets/video.mp4';

function App() {
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    // Función para manejar el evento de tiempo del video
    const handleTimeUpdate = () => {
      // Mostrar la confirmación después de 43 segundos
      if (video.currentTime >= 43) {
        setMostrarConfirmacion(true);
        video.pause();  // Pausar el video
      }
    };

    // Agregar el evento de tiempo al video
    video.addEventListener('timeupdate', handleTimeUpdate);

    // Limpiar el evento al desmontar el componente
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
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

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div className="App">
      {/* Video */}
      <video
        ref={videoRef}
        controls
        playsInline
        className="video-background"
      >
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
