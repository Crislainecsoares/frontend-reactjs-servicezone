import React, { useState, useEffect } from 'react';
import api from '../services/api';

import '../global.css';
import '../App.css';
import '../Sidebar.css';
import '../Main.css';

import UserForm from '../components/UserForm';
import UserItem from '../components/UserItem';
import Buscar from '../Buscar';

function Home() {

  const [users, setUsers] = useState([]);
  const buscar = new Buscar();

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/users');

      setUsers(response.data);
    }

    loadUsers();
  }, []);

  async function handleAddUser(data) {
    const response = await api.post('/users', data)

    setUsers([...users, response.data]);
  }

  async function search(data) {
    const response = await api.post('/search', { data })

    setUsers([...users, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastro</strong>
        <UserForm onSubmit={handleAddUser} />

      </aside>

      <main>
        <input id="searchbar" onKeyUp={buscar.search} type="text"
          name="search" placeholder="O que está procurando?" />

        {/* <h5>Informe a Distância</h5> <h5> {distance} km </h5>          
        <input type="range" min="0" max="10000" name="distance" value={distance} onChange={e => changeDistance(e.target.value)}></input> */}
        <ul>
          {
            users.map(user => (
              <UserItem key={user._id} user={user} />
            ))}
        </ul>
      </main>
    </div>
  );
}

export default Home;