import React, { Component } from 'react'
import Navbar from "./Navbar";
import Footer from "./Footer";
import { RatingStar } from "rating-star";
import {genre_ids,months} from './FavoritesHelper'
import './../MovieDetails.css'
import './../App.css'

export default class MovieDetails extends Component {
  constructor(){
    super();
    this.state = {
      current_movie: JSON.parse(localStorage.getItem('favourites') == null
                     ? "[]"
                     : localStorage.getItem('favourites'))[0],
      favourites: JSON.parse(localStorage.getItem('favourites') == null
      ? "[]"
      : localStorage.getItem('favourites')).map((movie)=>{return (movie.id)})
    }

    console.log(this.state.current_movie)
  }
  get_genre = () =>{
    let str = this.state.current_movie.genre_ids.map((id)=> genre_ids[id]);
    return str;
  }

  convertDate = () => {
    let date_str = String(this.state.current_movie.release_date)
    let temp_date = date_str.split("-");
    let date =  temp_date[2] + " " + months[(temp_date[1] - 1)] + " " + temp_date[0];
    return date
  }

  handleFavourites = (movie) => {
    let localData = JSON.parse(localStorage.getItem('favourites') == null
                    ? "[]"
                    : localStorage.getItem('favourites'))

    if (this.state.favourites.includes(movie.id))
      localData = localData.filter((fav_movie)=> movie.id !== fav_movie.id)
    else
      localData.push(movie)
    localStorage.setItem('favourites', JSON.stringify(localData));
    this.addFavorities(localData)
  }

  addFavorities = (localData) => {
    let temp = localData.map((movie)=>{
      return movie.id
    })
    this.setState({favourites: [...temp]})
  }

  render() {
    return (
      <div>
        <Navbar/>
        <div class="container">
          <div class="card">
            <div class="container-fliud">
              <div class="wrapper row">
                <div class="preview col-md-6">

                  <div class="preview-pic tab-content fst-italic">
                    <div class="tab-panel active movie-div"><img class = "movie-pic" src= {`${process.env.REACT_APP_API_POSTER_PATH}${this.state.current_movie.backdrop_path}`} /></div>
                    <h2 class="product-title">{this.state.current_movie.title || this.state.current_movie.name}</h2>
                    <div className = "product-title">
                      {
                        this.state.current_movie.genre_ids.map((id)=>{
                          return(<h4 class = "badge bg-primary genre_badge">{genre_ids[id]}</h4>)
                        })
                      }
                    </div>
                    <h5><b>Story:</b></h5>
                    <p class="product-description">{this.state.current_movie.overview}</p>
                  </div>

                </div>
                <div class="details col-md-6 fst-italic">
                  <div class="rating-star">
                    {
                      <RatingStar id={this.state.current_movie.id} rating={(this.state.current_movie.vote_average/10)*5} size = {50}/>
                    }
                  </div>
                  <span class="review-no vote fst-italic">{this.state.current_movie.vote_count} Votes</span>
                  <p class="vote"><strong>R-Rated: </strong>{this.state.current_movie.adult === false ? "No" : "Yes"}</p>
                  <p class="vote"><strong>Language: <span class = {"lang-icon lang-icon-"+this.state.current_movie.original_language}></span></strong></p>
                  <p class="vote"><strong>Released On: {this.convertDate()}</strong></p>

                  <div className = {this.state.favourites.includes(this.state.current_movie.id)
                          ? "vote btn btn-danger remove-fav" : "vote btn btn-primary" } onClick = {()=>this.handleFavourites(this.state.current_movie)}>
                    <p class="fav-btn"> <span className = {this.state.favourites.includes(this.state.current_movie.id)
                          ? "fa fa-heart blue" : "fa fa-heart red"}></span>
                      {this.state.favourites.includes(this.state.current_movie.id)
                            ? "Remove from Favourites"
                            : "Add to Favourites"}
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

