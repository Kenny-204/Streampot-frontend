import { Button } from "./Button";
import { LoginForm, LoginHeading } from "./UserLogin";

function UserSignUp() {
  return (
    <>
      <LoginHeading />
      <LoginForm>
        <img src="user2.png" alt="user-pic" width="100px" />
        <p><span className="fa fa-camera" ></span> Add an avatar</p>
        <label htmlFor="name">Name *</label>
        <input type="text" name="name" />
        <label htmlFor="email">Email *</label>
        <input type="text" name="email" />
        <label htmlFor="password">Password*</label>
        <input type="text" name="password" />
        <Button>Create Profile</Button>
        <p>
          or <a href="#">Login</a>
        </p>
      </LoginForm>
    </>
  );
}

export default UserSignUp;
