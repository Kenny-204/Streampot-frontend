import { useState } from "react";
import { Button } from "../components/Button";
import { LoginForm, LoginHeading } from "./UserLoginPage";
import { Link } from "react-router-dom";

function UserSignUp() {
  const [email, setEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const options = {
    method: "POST",
    headers: {
      "accepts": "application/json",
    },
    body: JSON.stringify({ email, password, userName }),
  };
  async function handleUserSignup(e) {
    e.preventDefault()
    const request = await fetch("/auth/register", options);
    const data = request.json();
    console.log(data);
  }

  return (
    <>
      <LoginHeading />
      <LoginForm>
        <img src="user2.png" alt="user-pic" width="100px" />
        <p>
          <span className="fa fa-camera"></span> Add an avatar
        </p>
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          name="name"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="email">Email *</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password*</label>
        <input
          type="text"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleUserSignup}>Create Profile</Button>
        <p>
          or <Link to="/login">Login</Link>
        </p>
      </LoginForm>
    </>
  );
}

export default UserSignUp;
