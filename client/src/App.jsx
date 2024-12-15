import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navBar/Navbar";
import Login from "./screens/Login";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
