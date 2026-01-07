import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { API_URL } from "../utils/config";

interface user {
  _id: string;
  email: string;
  name: string;
}

interface authContextType {
  currentUser: user | null;
  signup: (
    email: string,
    password: string,
    passwordConfirm: string,
    name: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  token: string;
}
const AuthContext = createContext<authContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState<user | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    async function fetchUser() {
      const savedToken = localStorage.getItem("token") || "";
      if (!savedToken) {
        setLoading(false);
        return;
      }
      setToken(savedToken);
      const res = await fetch(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${savedToken}` },
      });
      const data = await res.json();
      const user = {
        _id: data.data._id,
        name: data.data.name,
        email: data.data.email,
      };
      setCurrentUser(user);
      setLoading(false);
    }
    fetchUser();
  }, []);

  async function signup(
    email: string,
    password: string,
    passwordConfirm: string,
    name: string
  ) {
    const response = await fetch(`${API_URL}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, passwordConfirm, name }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const data = await response.json();
    const newUser = {
      _id: data.data._id,
      name: data.data.name,
      email: data.data.emaill,
    };
    localStorage.setItem("token", data.token);

    setToken(data.token);
    setCurrentUser(newUser);
  }

  async function login(email: string, password: string) {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const data = await response.json();
    console.log(data);
    localStorage.setItem("token", data.token);
    setToken(data.token);
  }
  function logout() {
    localStorage.removeItem("token");
    setCurrentUser(null);
  }

  const value: authContextType = { currentUser, signup, login, logout, token };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
