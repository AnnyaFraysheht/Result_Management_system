import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthProvider, { AuthContext } from "./services/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthProvider>
      <App />
    </AuthProvider>
);
