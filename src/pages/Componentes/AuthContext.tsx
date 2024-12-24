import React, {createContext,useState} from "react";
import Login from "./Login";
interface AuthContextProps {
    isAunthenticated:boolean;
    login:(username:string,password:string)=>void;
}

export const AuthContext= createContext<AuthContextProps>({
    isAuthenticated:false,
    login:()=>{},
});

const AuthProvider: React.FC = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    const login = (username: string, password: string) => {
      if (username === "admin" && password === "admin") {
        setIsAuthenticated(true);
      } else {
        alert("Credenciales incorrectas.");
      }
    };
  
    return (
      <AuthContext.Provider value={{ isAuthenticated, login }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export default AuthProvider;
  