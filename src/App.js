import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar'
import Banner from './Components/Banner'
import Footer from './Components/Footer'
function App() {
  return (
    <div className="view">
      <Navbar/>
      <div class = "trending-div">
        <h1 class="display-2 trending-headline">Trending Right Now</h1>
        <Banner/>
      </div>

      <hr></hr>
      <div>
        <h1 class="display-5 trending-headline">Continue Watching</h1>
        <Banner/>
      </div>

      <hr></hr>
      <div>
        <h1 class="display-5 trending-headline">Award Winning</h1>
        <Banner/>
      </div>

      <hr></hr>
      <div>
        <h1 class="display-5 trending-headline">Latest and Upcoming</h1>
        <Banner/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
