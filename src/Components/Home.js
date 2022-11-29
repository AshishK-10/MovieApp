import React, { Component } from 'react'
import Banner from "./Trending";
import AwardWinning from "./AwardWinning";
import NewArrivals from "./NewArrivals";
import Navbar from "./Navbar";
import Footer from "./Footer";
let taglines = ["Trending Now", "Award Winning", "Latest and Upcoming"];
let banners = [<Banner />, <AwardWinning />, <NewArrivals />];

export default class Home extends Component{
  render() {
    return (
      <div>
        <Navbar/>
        {taglines.map((tagline, index) => {
          return (
            <div className="headline-div" key={index}>
              <h1
                className={
                  index === 0
                    ? "display-3 headline headline-text main-headline"
                    : "display-5 headline headline-text"
                }
              >
                {tagline}
              </h1>
              {banners[index]}
              <hr></hr>
            </div>
          );
        })}
        <Footer/>
      </div>
    )
  }
}