import { GoogleLogout } from "react-google-login";

const clientId =
  "343027757721-ud4anqta8isb3p6h830dhf37qnhifvsm.apps.googleusercontent.com";

function Logout() {
    
  const onSucess = () => {
    console.log("Log out successfull");
  };

  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={clientId}
        buttonText={"Logout"}
        onLogoutSuccess={onSucess}
      />
    </div>
  );
}

export default Logout;
