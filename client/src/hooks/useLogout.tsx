
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
const server_url = import.meta.env.VITE_SERVER_URL
const redirect_url = import.meta.env.VITE_REDIRECT_URL
const useLogout = () => {
  //const [loading, setLoading] = useState(false);
  //const [error, setError] = useState(null);
  const {checkLoginState} = useContext(AuthContext)
  const logout = async () => {
    //setLoading(true);
    //setError(null);

    try {
      await axios.get(server_url+'/logout',  { withCredentials: true });
      // Perform any additional client-side logout actions here, if necessary
      // For example, redirect to login page or home page
        checkLoginState()
        window.location.href=redirect_url
    } catch (err) {
      //setError('Logout failed. Please try again.');
      console.error(err);
    } finally {
      //setLoading(false);
      
    }
  };

  return { logout };
};

export default useLogout;
