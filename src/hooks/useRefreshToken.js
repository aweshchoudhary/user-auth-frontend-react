import axios from "../Api/Axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    try {
      const res = await axios.get("/refresh", {
        withCredentials: true
      });
      setAuth((prev) => {
        return { ...prev, accessToken: res.data.accessToken };
      });
      return res.data.accessToken;
    } catch (err) {
      console.log(err);
    }
  };
  return refresh;
};

export default useRefreshToken;
