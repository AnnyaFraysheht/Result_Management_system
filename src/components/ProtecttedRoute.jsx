import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {
  const [auth, setAuth] = useState(null); // Use null to indicate loading state

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/check-auth",
          { withCredentials: true }
        );

        if (response.data.authenticated === true || response.status === 200) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (error) {
        console.log("Error checking Session", error);
        setAuth(false);
      }
    };

    checkAuthentication();
    // eslint-disable-next-line
  }, []);

  // While authentication status is loading, you can choose to show a loading spinner or a message
  if (auth === null) {
    return <div>Loading...</div>;
  }

  return auth ? Component : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
