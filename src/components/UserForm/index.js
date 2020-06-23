import React, { useEffect, useState } from 'react';


function UserForm({ onSubmit }) {
  const [telefone, setTelefone] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [techs, setTechs] = useState('');
  const [avatar, setAvatar] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);

      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    )
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      telefone,
      name,
      bio,
      techs,
      avatar,
      latitude,
      longitude,
    });

    setTelefone('')
    setName('')
    setAvatar('')
    setBio('')
    setTechs('');
  }

  return (
    <form onSubmit={handleSubmit} >

      <div className="input-block">
        <label htmlFor="telefone">Celular (DD+numero)</label>
        <input
          name="telefone"
          id="telefone"
          required
          value={telefone}
          maxLength="11"
          minLength="10"
          onChange={e => setTelefone(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="name">Nome Completo</label>
        <input
          name="name"
          id="name"
          required
          value={name}
          maxLength="35"
          minLength="3"
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="bio">Fale algo você e suas atribuições</label>
        <input
          name="bio"
          id="bio"
          required
          value={bio}
          maxLength="100"
          minLength="10"
          onChange={e => setBio(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Serviços</label>
        <input
          name="techs"
          id="techs"
          required
          value={techs}
          maxLength="40"
          minLength="2"
          onChange={e => setTechs(e.target.value)}
        />
      </div>

      {/* <div className="upload">
        <input 
        type="file"
        name="avatar" 
        id="avatar" 
        required 
        value= {avatar}
        className="btn btn-success"
        multiple
        onChange={e => setAvatar(e.target.value)}
        />
        </div> */}
      <h6>Seu cadastro de localização será baseado em seu ponto atual ou você pode informar manualmente
          sua Latitude e Longitude.</h6>
      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            name="latitude"
            id="latitude"
            required
            value={latitude}
            onChange={e => setLatitude(e.target.value)} />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number"
            name="longitude"
            id="longitude"
            required
            value={longitude}
            onChange={e => setLongitude(e.target.value)} />
        </div>

      </div>
      <button type="submit" name="salvar"> Salvar</button>

    </form>
  );

}

export default UserForm;
