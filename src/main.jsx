import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthWrapper } from "./context/auth.context";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="343027757721-ud4anqta8isb3p6h830dhf37qnhifvsm.apps.googleusercontent.com">
    <React.StrictMode>
      <Router>
        <AuthWrapper>
          <App />
        </AuthWrapper>
      </Router>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
