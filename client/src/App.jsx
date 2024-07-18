import { useEffect, useState } from "react";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import PrivateData from "./components/PrivateData";
import {Route, Routes} from 'react-router-dom'
import AuthContext from './contexts/AuthContext'
import RequiredAuth from "./components/RequiredAuth";
import "./App.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn]=useState(null);
  const [username, setUsername] = useState(null)



  async function login({username, password}) {
    const results = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await results.json();
    if (!results.ok) {
      console.log("loging fetch error");
    } else {
      console.log(data);
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true)
      setUsername(data.username)
    }

  }

  function logout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false)
    setUsername(null)

  }

  const authObject = {
    isLoggedIn,
    username,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={authObject}>
      <div>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/private" element={<RequiredAuth><PrivateData /></RequiredAuth>}/>
        </Routes>

      </div>
    </AuthContext.Provider>
  );
}
