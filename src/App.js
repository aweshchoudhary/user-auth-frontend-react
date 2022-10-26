import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterFrom";
import PersistLogin from "./components/PersistLogin";
import SamplePage from "./components/SamplePage";
import RequireAuth from "./components/RequireAuth";
import "./styles.css";
import Layout from "./components/Layout";
import UpdateForm from "./components/UpdateForm";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route element={<PersistLogin />}>
                {"Public Routes"}
                <Route path="register" element={<RegisterForm />} />
                <Route path="login" element={<LoginForm />} />

                {"Protected Routes"}
                <Route element={<RequireAuth />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="samplepage" element={<SamplePage />} />
                  <Route path="update" element={<UpdateForm />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
