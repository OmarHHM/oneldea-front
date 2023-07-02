import React, { useState, useEffect, useContext} from 'react';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import '../styles/Edit.css'
import { EmailContext } from './EmailContext';


function Edit({param, param1, handleClose}) {
  const data = param1;
  useEffect(() => {
    const popupWidth = 500;
    const popupHeight = 500;

    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    const popupLeft = (screenWidth - popupWidth) / 2;
    const popupTop = (screenHeight - popupHeight) / 2;

    window.moveTo(popupLeft, popupTop);
    window.resizeTo(popupWidth, popupHeight);
  }, []);

  const [nombre, setNombre] = useState('');
  const [tokenTelegram, setTokenTelegram] = useState('');
  const [instagram, setInstagram] = useState('');
  const [status, setStatus] = useState('');
  const [audio, setAudio] = useState('');
  const { email, setEmail } = useContext(EmailContext);

  if (param === 'edit') {
    setNombre(data.name);
    setInstagram(data.instagram);
    setStatus(data.status);
    setTokenTelegram(data.tokenTelegram);
  }

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleTokenTelegramChange = (event) => {
    setTokenTelegram(event.target.value);
  };

  const handleInstagramChange = (event) => {
    setInstagram(event.target.value);
  };


  const handleVoiceKeyChange = (event) => {
    const file = event.target.files[0];
    setAudio(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus('active');
  
    // Crear un objeto FormData
  const formData = new FormData();

  // Agregar los valores actualizados al FormData
  formData.append('name', nombre);
  formData.append('telegram_token', tokenTelegram);
  formData.append('instagram', instagram);
  formData.append('status', status);
  formData.append('audio', audio);
  formData.append('user', email);

    // Realizar la solicitud a la API
    fetch('http://localhost:8080/bots', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        handleClose();
        console.log('Respuesta de la API:', data);
      })
      .catch(error => {
        console.error('Error al llamar a la API:', error);
      });
    };

  return (
    <div className='modal-container'>
      <div className='modal-content '>
      {param === 'edit' ? (
        <h2>Editar Bot</h2>
      ) : (
        <h2>Agregar Bot</h2>
      )}

      <div className="social-media-checkboxes">
        <label>
          <input type="checkbox" defaultChecked />
          <span>Telegram</span>
        </label>
        <br/>
        <label>
          <input type="checkbox" disabled />
          <span>WhatsApp</span>
        </label>
        <br/>
        <label>
          <input type="checkbox" disabled />
          <span>Twitter</span>
        </label>
        <br/>
        <label>
          <input type="checkbox" disabled />
          <span>LinkedIn</span>
        </label>
        <br/>
        <label>
          <input type="checkbox" disabled />
          <span>Facebook</span>
        </label>
      </div>
      <div className='section-form'>
        <div className="form-group">
          <TextField
            id="nombre"
            placeholder="Shakira"
            required
            label="Nombre"
            value={nombre}
            onChange={handleNombreChange}
            size="large" 
            style={{ width: '100%' }}    
          />
        </div>
        <br/>
        <div className="form-group">
          <TextField
            id="token_telegram"
            type="text"
            label="Token de Telegram"
            required
            value={tokenTelegram}
            onChange={handleTokenTelegramChange}
            helperText={
              <Link href="https://helpdesk.bitrix24.es/open/17658892/" target="_blank">
                Guía para obtener el token de Telegram
              </Link>
            }
            size="large" 
            style={{ width: '100%' }}    
          />
        </div>

        <div className="form-group">
          <TextField
            placeholder="@shakira"
            id="instagram"
            type="text"
            label="Instagram de celebridad"
            required
            value={instagram}
            onChange={handleInstagramChange}
            size="large" 
            style={{ width: '100%' }}    
          />
        </div>

        {param === 'add' && (
          <div className="form-group">
            <label htmlFor="audio">Voz de celebridad max 2 MB mp4</label>
            <input required type="file" accept="audio/*" id="audio" onChange={handleVoiceKeyChange} />
          </div>
        )}
      </div>
      <div className='section-buttons'>
      
      <div className='modal-button'>
        <button  className="form-button"  onClick={handleClose}>
          Cancelar
        </button>
      </div>
      <div className='modal-button'>
        <button type="submit" className="form-button"  onClick={handleSubmit}>
          Guardar
        </button>
      </div>
      </div>
      </div>
    </div>
  );
}

export default Edit;