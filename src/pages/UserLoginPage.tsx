import { ReactNode } from "react";
import { Button } from "../components/Button";
import {Link} from 'react-router-dom'


function UserLoginPage() {
  return (
    <>
      <div className="login-container">
        <LoginHeading />
        <LoginForm>
          <label htmlFor="email">Email *</label>
          <input type="text" name="email" />
          <label htmlFor="password">Password*</label>
          <input type="text" name="password" />
          <Button>Login</Button>
          <p>
            or <Link to="/signup">create an account</Link>
          </p>
        </LoginForm>
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
}

export function LoginForm({ children }: LoginFormProps) {
  return <form className="user-login flex">{children}</form>;
}
export default UserLoginPage;
