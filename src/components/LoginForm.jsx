import { TextField, Card, CardActions, CardContent } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState, useEffect, useContext } from "react";
import axios from "../Api/Axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { setAuth, auth } = useAuth();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const locatin = useLocation();
  const from = locatin.state?.from?.pathname || "/";

  // Validation
  useEffect(() => {
    if (auth.accessToken) return navigate("/", { replace: true });
  }, []);

  useEffect(() => {
    setErrorMessage("");
    setError(false);
  }, [user, password]);

  // functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newUser = {
      user,
      password
    };

    await axios
      .post("/login", newUser, { withCredentials: true })
      .then(async (e) => {
        await setAuth({ user, accessToken: e?.data?.accessToken });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError(true);
        setErrorMessage(err?.response?.data?.message);
      });
    setLoading(false);
    return;
  };

  return (
    <>
      {success ? (
        <>
          <h1>Login Successfully</h1>
        </>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <Card className="card">
            <CardContent>
              <h1>Login</h1>
              <br />
              <div className="form">
                <div className="message">{error ? errorMessage : null}</div>
                <div className="form-g">
                  <TextField
                    disabled={success || loading}
                    className="input"
                    id="outlined-basic"
                    label="Enter Email Or Username"
                    variant="outlined"
                    error={error}
                    value={user}
                    onChange={(e) => {
                      setUser(e.target.value);
                    }}
                  />
                </div>
                <div className="form-g">
                  <TextField
                    disabled={success || loading}
                    id="outlined-password-input"
                    className="input"
                    label="Enter Password"
                    type="password"
                    autoComplete="current-password"
                    error={error}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <br />
                <br />
                <p>
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </div>
            </CardContent>
            <CardActions>
              <LoadingButton
                loading={loading}
                type="submit"
                variant="contained"
                size="large"
                className="btn"
                disabled={!user || !password}
              >
                Login
              </LoadingButton>
            </CardActions>
          </Card>
        </form>
      )}
    </>
  );
};

export default LoginForm;
