import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import videoSource from './assets/video.mp4';
import Swal from 'sweetalert2';

function App() {
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const handleTimeUpdate = () => {
      if (video.currentTime >= 44) {
        setMostrarConfirmacion(true);
        video.pause();
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

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
    const ubicacionEvento = 'Ubicación del evento: https://maps.app.goo.gl/v2SwcdC6ek2cUxew9';
    const mensaje = `Confirmación de asistencia de ${nombre} ${apellido}. Confirmación: ${confirmacion}. ${ubicacionEvento}`;
    const numeroWhatsApp = '+598 97007813';
    const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    // Mostrar SweetAlert antes de confirmar
    Swal.fire({
      title: '𝑷𝒐𝒓 𝒇𝒂𝒗𝒐𝒓',
      text: ' , 𝒍𝒆𝒔 𝒂𝒈𝒓𝒂𝒅𝒆𝒄𝒆𝒓í𝒂𝒎𝒐𝒔 𝒒𝒖𝒆 𝒂𝒔𝒊𝒔𝒕𝒂𝒏 𝒂𝒍 𝒆𝒗𝒆𝒏𝒕𝒐 𝒗𝒊𝒔𝒕𝒊𝒆𝒏𝒅𝒐 𝒂𝒕𝒖𝒆𝒏𝒅𝒐 𝒇𝒐𝒓𝒎𝒂𝒍.',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      // Si el usuario hace clic en "OK", abrir enlace de WhatsApp
      if (result.isConfirmed) {
        window.open(enlaceWhatsApp, '_blank');
      }
    });
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
      <div className='video'>
        <video
          ref={videoRef}
          controls
          playsInline
          className="video-background"
        >
          <source src={videoSource} type="video/mp4" />
          Tu navegador no soporta la etiqueta de video.
        </video>
      </div>

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
                <option value="">Podra asistir?</option>
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
