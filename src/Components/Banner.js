import React, { Component } from 'react'
import {movies,desc} from './getMovies'
export default class Banner extends Component {
  constructor(){
    super();
    this.state = {
      hover:""
    }
  }
  render() {
    return (
      <div className = "movie-card">
        {
          movies.length === 0?
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div> :
          <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="false">
            <div className="carousel-indicators">
              {movies.map((movie,index) => {
                return (
                  <button type="button" key = {index} data-bs-target="#carouselExampleCaptions" data-bs-slide-to={index} className={index === 0 ? "active" : ""} aria-current="true" aria-label="Slide 1"></button>
                )
              })}
            </div>
            <div className="carousel-inner">
              {movies.map((movie,index) => {
                 return (
                  <div className= {index === 0 ? "carousel-item active" : "carousel-item"} key = {index} onMouseEnter = {()=>this.setState({hover: index})} onMouseLeave = {()=> this.setState({hover:''})}>
                    <img src={movie.image} className="d-block w-100 movie-image" alt="..."/>
                    <div className="carousel-caption d-md-blok">

                      {
                        this.state.hover === index &&
                        <button type="button" className="btn btn-success"  onClick={check}>Add to Favourites</button>
                      }

                      <h5>{movie.name}</h5>
                      <p className = "movie-text">{desc}</p>
                    </div>
                  </div>
                 )
              })}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        }
      </div>
    )
  }
}

function check(e)
{
  console.log(e)
}