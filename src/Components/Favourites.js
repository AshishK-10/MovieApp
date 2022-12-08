import React, { Component } from 'react'
import Navbar from "./Navbar";
import Footer from "./Footer";
import {genre_hash, id_to_genre , table_headers} from './FavoritesHelper'
import {Link} from 'react-router-dom'

export default class Favourites extends Component {
  constructor(){
    super();
    this.state = {
      movies: JSON.parse(localStorage.getItem('favourites') == null
      ? "[]"
      : localStorage.getItem('favourites')),
      genres: [],
      filtered_movies: [],
      curr_genre: 'all_genres',
      searched_text : '',
    }
  }

  async componentDidMount(){
    this.setState
    ({
      genres: this.get_genre(),
      filtered_movies: this.state.movies
    })
  }

  get_genre = () => {
    let unique_genres = []
    this.state.movies.forEach((movie) =>
    {
       if(movie.genre_ids)
       {
         movie.genre_ids.forEach((id) =>
         {
             if(!unique_genres.includes(genre_hash[id]))
          	    unique_genres.push(genre_hash[id]);
         })
       }
       else
       {
        movie.genres.forEach((genre) =>
         {
             if(!unique_genres.includes(genre))
          	    unique_genres.push(genre);
         })
       }
    })
    return unique_genres
  }

  remove_favorites = (id)=>{
    console.log("entered remove section")
    let favs = JSON.parse(localStorage.getItem('favourites') == null
                            ? "[]"
                            : localStorage.getItem('favourites'))
    favs = favs.filter((favMovie)=>favMovie.id !== id)
    localStorage.setItem('favourites', JSON.stringify(favs));
    return favs;
  }

  filter_movies = () => {
    if (this.state.curr_genre === "all_genres")
    {
      this.setState({filtered_movies : this.state.movies})
    }
    else
    {
      this.setState({
        filtered_movies: this.state.movies.filter((movie)=>{
          return(
          movie.genres
          ? this.genre_index(movie)
          : movie.genre_ids.includes(id_to_genre[this.state.curr_genre])
        )})
      })
    }
  }

  genre_index = (movie)=>{
    let GenreIndex = movie.genres.findIndex(genre => {
      return genre.name === this.state.curr_genre;
    });
    return GenreIndex !== -1
  }

  render() {
    {
      let flag = true
      var filter_array = this.state.filtered_movies

      if(this.state.searched_text === '' && flag){
        flag = false
      }else if(flag){
        let temp = this.state.movies.filter((movie)=>{
            let title = movie.title || movie.name
            title = title.toLowerCase()
            return title.includes(this.state.searched_text.toLowerCase())
          })
        if(temp.length > 0){
          filter_array = [...temp]
        }else
        {
          filter_array = []
        }
        flag = false
      }
    }

    return (
      <div className='main favorites-tab'>
        <Navbar/>
        <div className='row '>
          <div className='col-3'>
            <div>
              <div class="d-flex flex-column justify-content-center flex-shrink-0 p-3 text-white bg-dark" style={{width: "280px"}}>
                <a  class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                  <span className="fs-4">Filters</span>
                </a>
                <hr/>
                <ul className="nav nav-pills flex-column mb-auto genres-table ">
                  <li className="nav-item">
                    <a href = "#" className = {this.state.curr_genre === 'all_genres' ? "nav-link active" : "nav-link text-white genre-btn"} onClick={()=>{this.setState({curr_genre: 'all_genres'}, () => this.filter_movies())}} aria-current="page">
                      All Genres
                    </a>
                  </li>
                    {
                      this.state.genres.map((genre,index) => {
                        return(
                        <li>
                          <a href = "#" className = {this.state.curr_genre === genre ? "nav-link active" : "nav-link text-white genre-btn"} onClick={()=>{this.setState({curr_genre: genre}, () => this.filter_movies())}}>
                            {genre}
                          </a>
                        </li>
                      )})
                    }
                </ul>
              </div>
            </div>
            {/* <div className='favorites-genres fixed-top'>
            <p className="fst-italic" style={{textAlign:"center", marginRight: '28%'}}><b>Filters</b></p>
              <ul className="nav flex-column">
                { this.state.curr_genre === 'all_genres' ?
                  <li className="nav-item">
                    <p className="nav-link btn selected-genre">All Genres</p>
                  </li>
                  :
                  <li className="nav-item">
                    <p className="nav-link btn genre-btn" onClick={()=>{this.setState({curr_genre: 'all_genres'}, () => this.filter_movies())}}>All Genres</p>
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
                          <p className="nav-link btn genre-btn" onClick={()=>{this.setState({curr_genre: genre},()=>this.filter_movies())}}>{genre}</p>
                        </li>
                    )
                  })
                }
              </ul>
            </div> */}
          </div>

          <div className="col-9 favourite-table">
            <div className='row'>
              <input type="text" className="input-group-text col" placeholder='Movie Name' value = {this.state.searched_text} onChange = { (e) => this.setState({searched_text: e.target.value})}/>
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
                    filter_array.map((movie,index) =>{
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
                          <td><button type="button" id = {index} className="btn btn-danger" onClick = {()=> {this.setState({
                                                                                                              movies: [...this.remove_movies()]
                                                                                                            },
                                                                                                             () => this.setState({genres: this.get_genre(), filtered_movies: this.state.movies},()=>console.log("genre set=>", this.state.genres)))}}>Remove</button></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
