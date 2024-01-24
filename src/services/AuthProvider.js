import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState();
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, role, setRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
