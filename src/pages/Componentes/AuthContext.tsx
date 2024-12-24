import React, {createContext,useState} from "react";
interface AuthContextProps {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
}


export const AuthContext= createContext<AuthContextProps>({
    isAuthenticated:false,
    login:()=>{},
});

const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (username: string, password: string) => {
    console.log(`Usuario ingresado: ${username}, Contraseña: ${password}`);
    if (username === "admin" && password === "admin") {
      setIsAuthenticated(true);
      console.log("Acceso concedido");
    } else {
      alert("Credenciales incorrectas.");
      setIsAuthenticated(false);
      console.log("Acceso denegado");
    }
  };
  
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
