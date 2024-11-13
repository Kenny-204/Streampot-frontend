import { Button } from "./Button";

function UserLoginPage() {
  return (
    <>
    <div className="login-container">

        <div className="login-heading">
          <p>
            Hello!
            <br />
            Please log in or create an account
            <br />
            to use the features of this app
          </p>
        </div>
      <form className="user-login flex">
        <label htmlFor="email">Email *</label>
        <input type="text" name="email" />
        <label htmlFor="password">Password*</label>
        <input type="text" name="password" />
        <Button>Login</Button>
        <p>
          or <a href="#">create an account</a>
        </p>
      </form>
    </div>
    </>
  );
}

export default UserLoginPage;
