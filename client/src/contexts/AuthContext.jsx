import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { createContext, useContext, useState, useMemo, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    token: Cookies.get("authToken"),
    account: Cookies.get("account"),
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("authToken");
    const account = Cookies.get("account")
      ? JSON.parse(Cookies.get("account"))
      : null;

    if (token && account) {
      setAuth({ token, account });
    }
  }, []);

  const logout = () => {
    Cookies.remove("authToken");
    Cookies.remove("account");
    setAuth({ token: null, account: null });
    navigate("/connexion");
  };

  const contextValue = useMemo(
    () => ({ auth, setAuth, logout }),
    [auth, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
