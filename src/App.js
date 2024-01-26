import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Swal from 'sweetalert2';
import videoSource from './assets/video.mp4';

function App() {
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [confirmacion, setConfirmacion] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
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

  const handleConfirmacionChange = (event) => {
    setConfirmacion(event.target.value);
  };

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleApellidoChange = (event) => {
    setApellido(event.target.value);
  };

  const validarCampos = () => {
    return confirmacion.trim() !== '' && nombre.trim() !== '' && apellido.trim() !== '';
  };

  const handleConfirmar = () => {
    if (!validarCampos()) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos antes de confirmar la asistencia.',
        icon: 'error',
        customClass: {
          container: 'custom-swal-container',
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
          content: 'custom-swal-content',
          confirmButton: 'custom-swal-confirm-button',
          cancelButton: 'custom-swal-cancel-button',
        },
      });
      return;
    }

    let tituloAlerta = '';
    let textoAlerta = '';
    let ubicacionEvento = '';

    if (confirmacion === 'Si') {
      tituloAlerta = 'Por favor';
      textoAlerta =
        'Les agradeceríamos que asistan al evento vistiendo atuendo formal, a continuación confirmaremos por WhatsApp y en el mensaje tendrás la ubicación del evento, desde ya muchas gracias!';
      ubicacionEvento = 'Ubicación del evento: https://maps.app.goo.gl/v2SwcdC6ek2cUxew9\n';
    } else if (confirmacion === 'No') {
      tituloAlerta = 'No te preocupes!';
      textoAlerta = 'Recuerda que puedes volver a dar tu confirmación si cambias de opinión.';
    }

    const mensaje = `Confirmación de asistencia de ${nombre} ${apellido}: ${
      confirmacion === 'Si' ? 'Sí, podré asistir' : 'No podré asistir'
    }.\n${ubicacionEvento}`;

    const numeroWhatsApp = '+59898687769';
    const numeroWhatsAppFormateado = encodeURIComponent(numeroWhatsApp);
    const mensajeCodificado = encodeURIComponent(mensaje);
    const enlaceWhatsApp = `https://wa.me/${numeroWhatsAppFormateado}?text=${mensajeCodificado}`;

    Swal.fire({
      title: tituloAlerta,
      text: textoAlerta,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar',
      customClass: {
        container: 'custom-swal-container',
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
        content: 'custom-swal-content',
        confirmButton: 'custom-swal-confirm-button',
        cancelButton: 'custom-swal-cancel-button',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Enlace WhatsApp:', enlaceWhatsApp);
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
