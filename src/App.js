import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Swal from 'sweetalert2';
import videoSource from './assets/video.mp4';

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

  const validarCampos = () => {
    return nombre.trim() !== '' && apellido.trim() !== '' && confirmacion.trim() !== '';
  };

  const handleConfirmar = () => {
    if (!validarCampos()) {
      Swal.fire({
        title: 'Completa los campos',
        text: 'Por favor, completa todos los campos antes de confirmar.',
        icon: 'error',
      });
      return;
    }

    if (confirmacion === '') {
      Swal.fire({
        title: 'Selecciona una opción',
        text: 'Por favor, selecciona si podrás asistir o no.',
        icon: 'error',
      });
      return;
    }

    const ubicacionEvento = 'Ubicación del evento: https://maps.app.goo.gl/v2SwcdC6ek2cUxew9';
    const mensaje = `Confirmación de asistencia de ${nombre} ${apellido}. Confirmación: ${confirmacion}. ${ubicacionEvento}`;
    const numeroWhatsApp = '+598 97007813';
    const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    Swal.fire({
      title: 'Por favor',
      text: 'les agradeceriamos que asistan al evento vistiendo atuendo formal, desde ya muchas gracias!',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
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
      <div className="video">
        <video ref={videoRef} controls playsInline className="video-background">
          <source src={videoSource} type="video/mp4" />
          Tu navegador no soporta la etiqueta de video.
        </video>
        <button className="play-pause" onClick={handlePlayPause}>
          {videoRef.current && videoRef.current.paused ? 'Reproducir' : 'Pausar'}
        </button>
      </div>

      {mostrarConfirmacion && (
        <div className="confirmar-asistencia">
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
                <option value="">Podrás asistir?</option>
                <option value="Si">Sí, asistiré</option>
                <option value="No">No podré asistir</option>
              </select>
            </label>
            <br />
            <button type="button" onClick={handleConfirmar}>
              Confirmar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
