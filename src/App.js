import NoPage from './Components/NoPage'
import Favourites from "./Components/Favourites";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Components/Home'
import MovieDetails from './Components/MovieDetails'
function App() {
  return (
    <div className="view">
         <BrowserRouter>
           <Routes>
             <Route key = "home" path="/" element={<Home />} />
             <Route key = "favorites" path="/favourites" element={<Favourites />} />
             <Route key = "movie-details" exact path="/movie" element={<MovieDetails/>} />
             <Route key = "noPage" path="*" element={<NoPage/>} />
           </Routes>
         </BrowserRouter>
           {/* <MovieDetails /> */}
    </div>
  );
}

export default App;
