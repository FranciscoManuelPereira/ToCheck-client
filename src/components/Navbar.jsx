import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import '../components/navbar.css'
import UserImage from "../assets/User.png"
function Navbar() {
  const { loggedIn, user, logout } = useContext(AuthContext);

  return (
    <nav className="nav-bar">
      <Link className="nav-items" to="/"> Home </Link>
      {loggedIn ? (
        <>
          <span className='helloUser'>Hello {user.name}</span>
          {/* <Link className="nav-items" to="/tasks"> Tasks </Link>
          <Link className="nav-items" to="/tasks/new"> Add a Task </Link> */}
          <img src={UserImage} alt="User Image" className='userImage'/>
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
