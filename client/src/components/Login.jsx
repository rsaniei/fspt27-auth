import { useState, useContext } from "react";
import axios from "axios"
import AuthContext from "../contexts/AuthContext";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "test",
    password: "test",
  });
  //3-Consume the context
  const auth = useContext(AuthContext);
  console.log(auth);

  // const [loginUsername, setLoginUsername] = useState("testusername");
  // const [loginPassword, setLoginPassword] = useState("testpassword");
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(null);

  const { username, password } = credentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const loginUser = async () => {
    auth.login(credentials)
    // const results = await fetch("/api/auth/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     username: username,
    //     password: password,
    //   }),
    // });
    // const data = await results.json();
    // if (!results.ok) {
    //   console.log("loging fetch error");
    // } else {
    //   console.log(data);
    //   localStorage.setItem("token", data.token);
    //   auth.login();
    // }
  };
  const logoutUser = () => {
    auth.logout()
    // localStorage.removeItem("token");
    // auth.logout()
  };

  const requestData = async () => {
  try {
    const {data} = await axios("/api/auth/profile", {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div>
      <div>
        <input
          value={username}
          onChange={handleChange}
          name="username"
          type="text"
          className="form-control mb-2"
        />
        <input
          value={password}
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control mb-2"
        />
        <div className="d-flex gap-2 justify-content-center">
          <button className="btn btn-primary" onClick={loginUser}>
            Log in
          </button>
          <button className="btn btn-outline-dark ml-2" onClick={logoutUser}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
