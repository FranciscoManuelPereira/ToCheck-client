import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

function LoginGoogle() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token:" + response.credential);
    let userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
  }

  useEffect(() => {
    /* global google */

    google.accounts.id.initialize({
      client_id:
        "343027757721-ud4anqta8isb3p6h830dhf37qnhifvsm.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <div>
      {user && (
        <div>
          <img src={user.picture} alt={user.name} />
          <h3>{user.name}</h3>
        </div>
      )}
    </div>
  );
}

export default LoginGoogle;
