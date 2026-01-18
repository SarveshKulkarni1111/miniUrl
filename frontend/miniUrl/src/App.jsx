import { BrowserRouter, Routes, Route, Outlet  } from "react-router-dom";
import "./App.css";
import Container from "./Components/Container/Container";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Dashboard from './Components/Dashboard/Dashboard';
import ProtectedRoute from "./Components/ProtectedRoute";
import Auth from "./Components/Auth/Auth";
import { useState } from 'react';

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

  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/"element={isAuth ? (<Container />) : (<Auth onAuth={() => setIsAuth(true)} />)}/>
          {/* <Route element={<ProtectedRoute />}> */}
            {/* <Route path="/" element={<Container />} /> */}
            <Route path="/analytics/dashboard" element={<Dashboard />} />
          {/* </Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;