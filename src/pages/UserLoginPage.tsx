import { FormEvent, ReactNode, useState } from "react";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { RenderError } from "../components/Error";
import { Loader } from "../components/Loader";
import { PrevButton } from "../components/PrevButton";

function UserLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { currentUser, login } = useAuth();

  async function handleUserLogin(
    e: FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await login(email, password);
      console.log(currentUser);
      navigate("/");
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="login-container">
        <LoginHeading />
        <div>
          {error && <RenderError message={error} />}
          {loading && <Loader width="30" />}
          <LoginForm onSubmit={(e) => handleUserLogin(e, email, password)}>
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
            <Button disabled={loading} type="submit">
              Login
            </Button>
            <p>
              or <Link to="/signup">create an account</Link>
            </p>
          </LoginForm>
        </div>


      </div>
    </>
  );
}

export function LoginHeading() {
  return (
    <div className="login-heading">
      <p>
        Hello!
        <br />
        Please log in or create an account
        <br />
        to use the features of this app
      </p>
    </div>
  );
}

interface LoginFormProps {
  children: ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export function LoginForm({ children, onSubmit }: LoginFormProps) {
  return (
    <form className="user-login flex" onSubmit={onSubmit}>
      {children}
    </form>
  );
}
export default UserLoginPage;
