import { Button } from "../components/Button";
import { LoginForm } from "./UserLoginPage";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";

export default function ProfilePage() {
  const { currentUser, logout } = useAuth();
  const { email, name, id } = currentUser;
  const navigate = useNavigate();

  function handleLogout(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    logout();
    navigate("/");
  }

  return (
    <>
      <div>
        <div
          style={{
            placeItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img
            src={`https://i.pravatar.cc/48?u=${id}`}
            alt="user-pic"
            width="100px"
            height="100px"
          />
        </div>

        <LoginForm onSubmit={(e) => handleLogout(e)}>
          <label htmlFor="name" aria-disabled={true}>
            Name *
          </label>
          <input type="text" name="name" value={name} />
          <label htmlFor="email" aria-disabled={true}>
            Email *
          </label>
          <input type="text" name="email" value={email} />
          <Button type="submit"  >Logout</Button>
        </LoginForm>
      </div>
    </>
  );
}
