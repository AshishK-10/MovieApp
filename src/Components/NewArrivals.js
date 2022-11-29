import React, { Component } from 'react'
import axios from 'axios'

export default class NewArrivals extends Component {
  constructor(){
    super();
    this.state = {
      hover:"",
      curr_page: 1,
      curr_index: 1,
      movies: [],
    }
  }

  async componentDidMount(){
    let res = await axios.get(`${process.env.REACT_APP_HEADER}/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&page=${this.state.curr_page}`);
    let data = res.data
    this.setState({
      movies:[...data.results]
    })
  }

  next_movies = async ()=> {
    if(this.state.curr_index === this.state.movies.length)
    {
      this.setState({
        curr_index : 1,
        curr_page: this.state.curr_page + 1
      },async () =>  {
        let res = await axios.get(`${process.env.REACT_APP_HEADER}/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&page=${this.state.curr_page}`);
        let data = res.data
        this.setState({
          movies:[...data.results]
        })
      })
    }
    else
    {
      this.setState({
        curr_index: this.state.curr_index + 1
      })
    }
  }

  previous_movies = async ()=> {
    if(this.state.curr_index === 1)
    {
      this.setState({
        curr_index : 1,
        curr_page: Math.max(this.state.curr_page - 1, 1)
      },async () =>  {
        let res = await axios.get(`${process.env.REACT_APP_HEADER}/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&page=${this.state.curr_page}`);
        let data = res.data
        this.setState({
          movies:[...data.results]
        })
      })
    }
    else
    {
      this.setState({
        curr_index: Math.max(this.state.curr_index - 1, 1)
      })
    }
  }

  update_index = async (e)=> {
    this.setState({
      curr_index: parseInt(e.target.id)
    })
  }

  render() {
    return (
      <div className = "movie-card">
        {
          this.state.movies.length === 0
          ?
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          :
          <div id="carouselExampleCaptionsNewArrivals" className="carousel slide" data-bs-ride="false">
            <div className="carousel-indicators">
              {this.state.movies.map((movie,index) => {
                return (
                  <button type="button" key = {movie.id} data-bs-target="#carouselExampleCaptionsNewArrivals" data-bs-slide-to={index} className={index === 0 ? "active" : ""} aria-current="true" aria-label={index + 1} id = {index + 1} onClick = {this.update_index}></button>
                )
              })}
            </div>

            <div className="carousel-inner">
              {this.state.movies.map((movie,index) => {
                 return (
                  <div className= {index === 0 ? "carousel-item active" : "carousel-item"} key = {"new"+movie.id} onMouseEnter = {()=>this.setState({hover: index})} onMouseLeave = {()=> this.setState({hover:''})}>
                    <img src={`${process.env.REACT_APP_API_POSTER_PATH}${movie.backdrop_path}`} className="d-block w-100 movie-image" alt="..."/>
                    <div className="carousel-caption d-md-blok">

                      {
                        this.state.hover === index &&
                        <button type="button" className="btn btn-primary"  id = {movie.id}>Add to Favourites</button>
                      }

                      <h5>{movie.title || movie.name}</h5>
                      <p className = "movie-text">{movie.overview}</p>
                    </div>
                  </div>
                 )
              })}

            </div>
            <button className="carousel-control-prev" onClick={this.previous_movies} type="button" data-bs-target="#carouselExampleCaptionsNewArrivals" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>

            <button className="carousel-control-next" onClick={this.next_movies} type="button" data-bs-target="#carouselExampleCaptionsNewArrivals" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        }
      </div>
    )
  }
}