import { FormEvent, useState } from "react";
import { Button } from "../components/Button";
import { LoginForm, LoginHeading } from "./UserLoginPage";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { RenderError } from "../components/Error";
import { Loader } from "../components/Loader";

function UserSignUp() {
  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { signup } = useAuth();

  async function handleUserSignup(
    e: FormEvent<HTMLFormElement>,
    email: string,
    password: string,
    name: string
  ) {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await signup(email, password,passwordConfirm, name);
      navigate("/");
    } catch (error: any) {
      console.log(error);
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <LoginHeading />
      <div>
        <div
          style={{
            placeItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img src="user2.png" alt="user-pic" width="100px" />
          <p>
            <span className="fa fa-camera"></span> Add an avatar
          </p>
          {error && <RenderError message={error} />}
          {loading && <Loader width="30" />}
        </div>

        <LoginForm onSubmit={(e) => handleUserSignup(e, email, password, name)}>
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
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
          <label htmlFor="password">Confirm Password*</label>
          <input
            type="text"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <Button disabled={loading} type="submit">
            Create Profile
          </Button>
          <p>
            or <Link to="/login">Login</Link>
          </p>
        </LoginForm>
      </div>
    </>
  );
}

export default UserSignUp;
