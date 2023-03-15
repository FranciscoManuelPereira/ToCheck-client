import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import '../components/navbar.css'

function Navbar() {
  const { loggedIn, user, logout } = useContext(AuthContext);

  return (
    <nav className="nav-bar">
      <Link className="nav-items" to="/"> Home </Link>
      {loggedIn ? (
        <>
          <span>Hello {user.name}</span>
          <Link className="nav-items" to="/tasks"> Tasks </Link>
          <Link className="nav-items" to="/tasks/new"> Add a Task </Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link className="nav-items" to="/signup"> Signup </Link>
          <Link className="nav-items" to="/login"> Login </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
