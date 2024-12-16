import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import LoginComponent from "./components/loginComponent/LoginComponent";
import Navbar from "./components/navBar/Navbar";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Login />}>
          <Route index element={<LoginComponent />} />
          <Route exact path="/forget-password" element={<ForgotPassword />} />
        </Route>
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
