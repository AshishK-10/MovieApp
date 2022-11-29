import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import NoPage from './Components/NoPage'
import Favourites from "./Components/Favourites";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import Home from './Components/Home'

function App() {
  return (
      <div className="view">
        <BrowserRouter>
          <Routes>
            <Route key = "home" path="/" element={<Home />} />
            <Route key = "home" path="/favourites" element={<Favourites />} />
            <Route key = "home" path="*" element={<NoPage/>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
