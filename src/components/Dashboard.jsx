import { Button, Card, CardContent, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from "../Api/Axios";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const nav = () => {
    navigate("/update", { replace: true });
  };
  const logout = async () => {
    try {
      await axios.get("/logout", { withCredentials: true });
      setAuth({});
      navigate("/login", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      try {
        const res = await axiosPrivate.get("/getuser");
        console.log(res);
        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
    console.log(user);
  }, [user]);

  return (
    <>
      {loading ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : (
        <Card className="card">
          <CardContent>
            <h2 style={{ color: "gray" }}>Dashboard</h2>
            <br />
            <h1>{user?.fullname}</h1>
            <p>Your Username: {user?.username}</p>
            <p>Your Email: {user?.email}</p>
            <br />
            <Button
              variant="contained"
              onClick={nav}
              style={{ marginRight: "20px" }}
            >
              Update
            </Button>
            <Button variant="contained" onClick={logout}>
              Logout
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Dashboard;
