import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar'
import Banner from './Components/Banner'
import Footer from './Components/Footer'
let taglines = ["Trending Now", "Continue Watching", "Award Winning", "Latest and Upcoming"]

function App() {
  return (
    <div className="view">
      <Navbar/>
      {
        taglines.map((tagline, index) => {
          return(
            <div className = "headline-div" key = {index}>
              <h1 className= {index == 0 ? "display-4 headline main-headline footer-text" : "display-5 headline footer-text"}>{tagline}</h1>
              <Banner/>
              <hr></hr>
            </div>
          )})
      }
      <Footer/>
    </div>
  );
}

export default App;
