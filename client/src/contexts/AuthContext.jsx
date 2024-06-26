import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { createContext, useContext, useState, useMemo } from "react";

  const AuthContext = createContext();
  export function AuthProvider({
    children,
  }) {

    const [auth, setAuth] = useState({
        token: localStorage.getItem('authToken'),
        account: JSON.parse(localStorage.getItem('account'))
      });

      const navigate = useNavigate();

      const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('account');
        setAuth({ token: null, account: null });
        navigate('/connexion');
      };

      const contextValue = useMemo(
        () => ({
          auth,
          setAuth,
          logout,
        })  
        [auth]
      );    

      return (
          <AuthContext.Provider value={contextValue}>
              {children}
          </AuthContext.Provider>
      )
  }

  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  export const useAuth =
    () => useContext(AuthContext);