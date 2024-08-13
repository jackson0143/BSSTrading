import { createContext } from "react"
import { useState, useCallback, useEffect } from "react"
import axios from 'axios'
const server_url = import.meta.env.VITE_SERVER_URL

axios.defaults.withCredentials = true;
export const AuthContext = createContext(null)
export const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null)
  const [user, setUser] = useState(null)
  
  const checkLoginState = useCallback(async () => {
    try {
      const response = await axios.get(server_url + '/loggedin', { withCredentials: true });

      const { loggedIn, user } = response.data;
  
      setLoggedIn(loggedIn);

      if (user) {
        setUser(user);

      }
    } catch (err) {
      console.error( err);
    }
  }, []);
  
    useEffect(() => {
     
      checkLoginState();
      
    }, [checkLoginState]);
    
  
    return (
      <AuthContext.Provider value={{ loggedIn, checkLoginState,  user}}>
        {children}
      </AuthContext.Provider>
    )
  }