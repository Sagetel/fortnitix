import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import History from "./pages/History";
import "normalize.css";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/singin" element={<Signin />} />
          <Route path="/singup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
