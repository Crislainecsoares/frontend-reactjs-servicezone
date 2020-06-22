import React from 'react';
import './style.css';


function UserItem({ user }) {

  return (
    <li className="user-item">
      <header>
        {/* <img src={user.avatar} alt=''/> */}
        <div className="user-info">
          <strong> {user.name} </strong>
          <span> {user.techs.join(' , ')} </span>
        </div>

      </header>
      <p> {user.bio} </p>
      <a href={`https://api.whatsapp.com/send?phone=55${user.telefone}`}><p>Deseja falar com {user.name}?</p>
        <img src="https://img.icons8.com/offices/30/000000/whatsapp.png" alt='whatsapp-icon' />
      </a>
    </li>

  )
}

export default UserItem;
