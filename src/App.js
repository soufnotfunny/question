import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/header";
import Footer from "./components/footer";

import Login from "./auth/Login";
import Register from "./auth/Register";

import HomePageAdmin from "./pages/admin/HomePageAdmin";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/try" element={<HomePageAdmin />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
