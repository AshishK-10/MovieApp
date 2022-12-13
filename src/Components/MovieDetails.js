import React, { Component } from 'react'
import Navbar from "./Navbar";
import Footer from "./Footer";
import { RatingStar } from "rating-star";
import {months} from './Helper'
import './../MovieDetails.css'
import './../App.css'
import axios from 'axios'

export default class MovieDetails extends Component {
  constructor(){
    super();
    this.state = {
      current_movie_id: window.location.pathname.split('/')[2],
      current_movie : [],
      favourites: JSON.parse(localStorage.getItem('favourites') == null
                  ? "[]"
                  : localStorage.getItem('favourites')).map((movie)=>{return (movie.id)}),
    }
  }

  async componentDidMount(){
    let res = await axios.get(`${process.env.REACT_APP_HEADER}/3/movie/${this.state.current_movie_id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    let data = res.data
    this.setState({
      current_movie: {...data}
    })
  }

  convertDate = () => {
    let date_str = String(this.state.current_movie.release_date)
    let temp_date = date_str.split("-");
    let date =  temp_date[2] + " " + months[(temp_date[1] - 1)] + " " + temp_date[0];
    return date
  }

  handleFavourites = (movie) => {
    let localData = JSON.parse(localStorage.getItem('favourites').length === 0
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
        {
          this.state.current_movie.length === 0
          ?
          <div className="d-flex justify-content-center">
            <div className="spinner-grow text-primary mt-5" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          :
          <div className="container">
            <div className="card">
              <div className="container-fliud">
                <div className="wrapper row">
                  <div className="preview col-md-6">
                    <div className="preview-pic tab-content fst-italic">
                      <div className="tab-panel active movie-div"><img className = "movie-pic" src= {`${process.env.REACT_APP_API_POSTER_PATH}${this.state.current_movie.backdrop_path}`} alt = ""/></div>
                      <h2 className="product-title">{this.state.current_movie.title || this.state.current_movie.name}</h2>
                      <div className = "product-title">
                        {
                          this.state.current_movie.genres.map((genre,index)=>{
                            return(
                              <h4 className = "badge bg-primary genre_badge" key = {index}>{genre.name}</h4>
                            )
                          })
                        }
                      </div>
                      <h5><b>Story:</b></h5>
                      <p className="product-description">{this.state.current_movie.overview}</p>
                    </div>
                  </div>
                  <div className="details col-md-6 fst-italic">
                    <p className = "mt-3">{this.state.current_movie.tagline ? <strong>&#10077; {this.state.current_movie.tagline}&#10078;</strong>:""}</p>
                    <div className="rating-star">
                      {
                        <RatingStar id="rating-star" rating={(this.state.current_movie.vote_average/10)*5} size = {50}/>
                      }
                    </div>
                    <p className="vote" key = "r-rated"><strong>R-Rated: </strong>{this.state.current_movie.adult === false ? "No" : "Yes"}</p>
                    <p className="vote countries" key = "countries"><strong>Countries: </strong>
                      <ul>
                        {
                          this.state.current_movie.production_countries.map((country,index)=>{
                            return(
                              <li className = "badge bg-info text-dark" key = {index}>{country.name}</li>
                            )
                          })
                        }
                      </ul>
                    </p>
                    <p className="vote" key = "language-present"><strong>Languages:
                      {
                        this.state.current_movie.spoken_languages.map((language,index)=>{
                          return(
                            <span className = {"lang-icon lang-icon-"+language.iso_639_1} key = {index}></span>
                          )
                        })
                      }
                    </strong></p>
                    <p className="vote" key = "runtime"><strong> Runtime: {this.state.current_movie.runtime} minutes</strong></p>
                    <p className="vote" key = "released-on"><strong>Released On: {this.convertDate()}</strong></p>
                    <div className = {this.state.favourites.includes(this.state.current_movie.id)
                            ? "vote btn btn-danger remove-fav" : "vote btn btn-primary" } onClick = {()=>this.handleFavourites(this.state.current_movie)}>
                      <p className="fav-btn"> <span className = {this.state.favourites.includes(this.state.current_movie.id)
                            ? "fa fa-heart" : "fa fa-heart red"}></span>
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
        }
        <Footer/>
      </div>
    )
  }
}

