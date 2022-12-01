import "./App.css";
import NoPage from './Components/NoPage'
import Favourites from "./Components/Favourites";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
