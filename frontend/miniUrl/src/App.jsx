import { HashRouter, Routes, Route, Outlet  } from "react-router-dom";
import "./App.css";
import Container from "./Components/Container/Container";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Dashboard from './Components/Dashboard/Dashboard';
import ProtectedRoute from "./Components/ProtectedRoute";
import Auth from "./Components/Auth/Auth";
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          setIsAuth(false);
        } else {
          setIsAuth(true);
        }
      } catch (error) {
        localStorage.removeItem("token");
        setIsAuth(false);
      }
    }
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/"element={isAuth ? (<Container />) : (<Auth onAuth={() => setIsAuth(true)} />)}/>
          <Route element={<ProtectedRoute />}>
            {/* <Route path="/" element={<Container />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;