import React from "react";
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  useLocation
} from "react-router-dom";


export default function LoginPage({ useAuth }) {
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();
  
    let { from } = location.state || { from: { pathname: "/" } };
    let login = () => {
      auth.signin(() => {
        history.replace(from);
      });
    };
  
    return (
      <div>
        <p>You must log in to view the page</p>
        <button onClick={login}>Log in</button>
      </div>
    );
  }
  