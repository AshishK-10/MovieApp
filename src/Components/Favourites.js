import React, { Component } from 'react'
import Navbar from "./Navbar";
import Footer from "./Footer";
import {genre_hash, table_headers} from './FavoritesHelper'
import {Link} from 'react-router-dom'

export default class Favourites extends Component {
  constructor(){
    super();
    this.state = {
      movies: JSON.parse(localStorage.getItem('favourites') == null
              ? "[]"
              : localStorage.getItem('favourites')),
      genres: [],
      curr_genre: 'all_genres'
    }
  }

  async componentDidMount(){
    this.get_genre(this.state.movies);
  }

  get_genre = (movies) => {
    movies.forEach((movie) =>
      movie.genre_ids ? this.add_to_genre(movie.genre_ids) : this.add_to_genre(movie.genres,true))

      console.log(this.state.movies,this.state.genres)
  }

  add_to_genre = (ids, is_hash = false)=>{
    if(is_hash)
    {
      ids.map((id)=>{
        let curr_data = this.state.genres
        curr_data.sort()
        if(!curr_data.includes(id.name))
          {
            curr_data.push(id.name)
            this.setState({genres: [...curr_data]})
          }
      })
    }
    else
    {
      ids.map((id)=>{
        let curr_data = this.state.genres
        if(!curr_data.includes(genre_hash[id]))
          {
            curr_data.push(genre_hash[id])
            curr_data.sort()
            this.setState({genres: [...curr_data]})
          }
      })
    }
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
            <p className="fst-italic" style={{textAlign:"center", marginRight: '28%'}}><b>Filters</b></p>
            <ul className="nav flex-column favorites-genres">
              { this.state.curr_genre === 'all_genres' ?
                <li className="nav-item">
                  <p className="nav-link btn selected-genre">All Genres</p>
                </li>
                :
                <li className="nav-item">
                  <p className="nav-link btn genre-btn" onClick={()=>{this.setState({curr_genre: 'all_genres'})}}>All Genres</p>
                </li>
              }
              {
                this.state.genres.map((genre,index) => {
                  return(
                    this.state.curr_genre === genre
                    ?
                      <li className="nav-item" key = {index}>
                        <p className="nav-link btn selected-genre">{genre}</p>
                      </li>
                    :
                      <li className="nav-item" key = {index}>
                        <p className="nav-link btn genre-btn" onClick={()=>{this.setState({curr_genre: genre})}}>{genre}</p>
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
                          <td>
                            <Link to= {{
                              pathname: `/movie/${movie.id}`,
                                }}>
                              <img src = {`${process.env.REACT_APP_API_POSTER_PATH}${movie.backdrop_path}`}alt = ""
                              className = "fav-image"/>
                            </Link>
                          </td>
                          <td>{movie.title || movie.name}</td>
                          <td>
                            {
                              movie.genres
                              ?
                              movie.genres.map((genre,index) => {
                                return(
                                  index === (movie.genres.length - 1)
                                  ? genre.name
                                  : genre.name+","
                                )
                              })
                              :
                              movie.genre_ids.map((genre,index) => {
                                return(
                                  index === (movie.genre_ids.length - 1)
                                  ? genre_hash[genre]
                                  : genre_hash[genre]+","
                                )
                              })
                            }
                          </td>

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
