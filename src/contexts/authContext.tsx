import { createContext, ReactNode, useContext, useState } from "react";

const API_URL = process.env.REACT_API_URL;

interface authContextType {
  currentUser: any;
  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout:Function
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
  const [currentUser, setCurrentUser] = useState(null);

  async function signup(email: string, password: string, name: string) {
    try {
      const response = await fetch(`${ API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();
      console.log(data);
      setCurrentUser(data);
    } catch (error) {
      //   console.log(error);
      throw error;
    }
  }

  async function login(email: string, password: string) {
    try {
      const response = await fetch(`${ API_URL}/auth/login`, {
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
      setCurrentUser(data);
    } catch (error) {
      throw error;
    }
  }
  function logout(){
    setCurrentUser(null)
  }

  const value:authContextType = { currentUser, signup, login,logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
