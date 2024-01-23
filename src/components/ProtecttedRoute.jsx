import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({allowedRoles}) => {
  const [auth, setAuth] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/check-auth",
          { withCredentials: true }
        );
        // const data = await response.json();
        // console.log(data)
        console.log(response)
        if (response.data.authenticated === true || response.status === 200) {
          setAuth(true);
        } else {
          setAuth(false);
        }
        console.log(auth)
      } catch (error) {
        console.log("Error checking Session", error);
        console.log(error.response.data.authenticated)
        setAuth(false);
      } 
    };
    checkAuthentication();
    // eslint-disable-next-line
  }, []); // Add an empty dependency array to run the effect only once

  return (

    auth ? <Outlet /> : <Navigate to={"/login"} />
  );
};

export default ProtectedRoute;
