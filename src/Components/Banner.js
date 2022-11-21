import React, { Component } from 'react'
import $ from 'jquery';
import {movies,desc} from './getMovies'
export default class Banner extends Component {
  render() {
    return (
      <div class = "movie-card">
        {
          movies.length === 0?
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div> :
          <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="false">
            <div class="carousel-indicators">
              {movies.map((movie,index) => {
                return (
                  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={index} class={index === 0 ? "active" : ""} aria-current="true" aria-label="Slide 1"></button>
                )
              })}
            </div>
            <div class="carousel-inner">
              {movies.map((movie,index) => {
                 return (
                  <div class= {index === 0 ? "carousel-item active" : "carousel-item"}>
                    <img src={movie.image} class="d-block w-100 movie-image" alt="..."/>
                    <div class="carousel-caption d-none d-md-block">
                      <h5>{movie.name}</h5>
                      <p class = "movie-text">{desc}</p>
                    </div>
                  </div>
                 )
              })}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        }
      </div>
    )
  }
}


$('.movie-text').focus(()=>{
  console.log("hey")
})