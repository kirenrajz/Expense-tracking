import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "../api/axiosConfig";

export const AuthContext = createContext({
  token: null,
  username: null,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
});


const LOGIN_URL = "/api/auth/login";
const REGISTER_URL = "/api/auth/register";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [username, setUsername] = useState(() => localStorage.getItem("username"));


  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (stored) setToken(stored);
  }, []);

  async function login({ username, password }) {
    const { data } = await axios.post(LOGIN_URL, { username, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", username);
    setToken(data.token);
    setUsername(username);
  }

  async function register({ username, password }) {
    await axios.post(REGISTER_URL, { username, password });


  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    setUsername(null);
  }

  const value = {
    token,
    username,
    login,
    register,
    logout,
    isAuthenticated: Boolean(token),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
