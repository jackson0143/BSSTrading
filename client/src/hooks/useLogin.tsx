
const useLogin = () => {
  //const [loading, setLoading] = useState(false);
  //const [error, setError] = useState(null);
  const auth_url = import.meta.env.VITE_AUTH_URL
  const login = () => {
    //setLoading(true);
    //setError(null);

    try {
      // Redirect to Discord authorization URL
      window.location.href = auth_url
      //setError('Login failed. Please try again.');

    }catch (err) {
      console.error(err);
    } finally {
      //setLoading(false);
    }
  };

  return { login};
};

export default useLogin;
