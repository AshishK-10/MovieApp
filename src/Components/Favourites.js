import React, { Component } from 'react'
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from 'axios'
import {genre_ids,table_headers} from './FavoritesHelper'

export default class Favourites extends Component {
  constructor(){
    super();
    this.state = {
      movies: [],
      genres: [],
      curr_genre: 'all_genres'
    };
  }

  async componentDidMount(){
    let res = await axios.get(`${process.env.REACT_APP_HEADER}/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&page=1`);
    let data = res.data
    this.setState({
      movies:[...data.results],
      genres: [...this.get_genre(data.results)]
    })
  }

  get_genre = (movies) => {
    let unique_ids = []
    movies.map((movie)=>{
      movie.genre_ids.map((id)=>{
        if (!unique_ids.includes(id))
          unique_ids.push(id)
      })
    })
    return unique_ids
  }

  update_genre = (e)=>{
    console.log(e.target.id)
  }

  render() {
    return (
      <div className='main favorites-tab'>
        <Navbar/>
        <div className='row'>
          <div className='col-3'>
            <p class="fst-italic" style={{textAlign:"center", marginRight: '28%'}}><b>Filters</b></p>
            <ul className="nav flex-column favorites-genres">
              { this.state.curr_genre == 'all_genres' ?
                <li className="nav-item">
                  <p className="nav-link btn selected-genre">All Genres</p>
                </li>
                :
                <li className="nav-item">
                  <p className="nav-link btn genre-btn" onClick={()=>{this.setState({curr_genre: 'all_genres'})}}>All Genres</p>
                </li>
              }
              {
                this.state.genres.map((genre,index)=>{
                  return(
                    this.state.curr_genre === genre_ids[genre] ?
                      <li className="nav-item ">
                        <p className="nav-link btn selected-genre"> {genre_ids[genre]}</p>
                      </li>
                      :
                      <li className="nav-item ">
                        <p className="nav-link btn genre-btn" onClick={()=>{this.setState({curr_genre: genre_ids[genre]})}}>{genre_ids[genre]}</p>
                      </li>
                  )
                })
              }
            </ul>
          </div>

          <div className="col-9 favourite-table">
            <div className='row'>
              <input type="text" className="input-group-text col" placeholder='Search'/>
              <input type="number" className="input-group-text col" placeholder='Rows'/>
            </div>
            <div className='row'>
              <table className="table">
                <thead>
                  <tr>
                    {
                      table_headers.map((header,index)=>{
                        return(
                          <th scope="col" key = {index}>{header}</th>
                        )
                      })
                    }
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.movies.map((movie,index) =>{
                      return (
                        <tr key = {index}>
                          <td><img src = {`${process.env.REACT_APP_API_POSTER_PATH}${movie.backdrop_path}`}
                          className = "fav-image"/></td>

                          <td>{movie.title || movie.name}</td>
                          <td>{movie.genre_ids.map((id,index)=>{return(index === movie.genre_ids.length - 1 ?
                          genre_ids[id] : genre_ids[id]+",")})}</td>

                          <td>{movie.popularity}</td>
                          <td>{movie.vote_average}</td>
                          <td><button type="button" id = {index} className="btn btn-danger" onClick = {this.update_genre}>Remove</button></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}
