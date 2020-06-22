import React, { useState, useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps"
import api from '../services/api';

function Map() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [latitude, setLatitude] = useState(-30.0277);
  const [longitude, setLongitude] = useState(-51.228730);

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

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/users');

      setUsers(response.data);
    }

    loadUsers();
  }, []);

  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: latitude, lng: longitude }}

    >

      {!!users && users.map(user => (

        <Marker
          key={user._id}
          position={{
            lat: user.location.coordinates[1],
            lng: user.location.coordinates[0]
          }}
          onClick={() => {
            setSelectedUser(user);
          }}
          icon={{
            url: 'https://img.icons8.com/color/48/000000/request-service.png',
            scaledSize: new window.google.maps.Size(30, 30)
          }}
        />
      ))}
      {selectedUser && (
        <InfoWindow
          position={{
            lat: selectedUser.location.coordinates[1],
            lng: selectedUser.location.coordinates[0]
          }}
          onCloseClick={() => {
            setSelectedUser(null);
          }}
        >
          <div>
            <h3>{selectedUser.techs}</h3>
            <p>{selectedUser.bio}</p>
            <a href={`https://api.whatsapp.com/send?phone=55${selectedUser.telefone}`}><p>Deseja falar com {selectedUser.name}?</p>
              <img src="https://img.icons8.com/offices/30/000000/whatsapp.png" alt='whatsapp-icon' />
            </a>
          </div>

        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function Mapa() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCFAKJ1oamqx7jcHpIEJM4DJINBI_BSaSM`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}  