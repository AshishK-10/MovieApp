import React, { Component } from 'react'
import Navbar from "./Navbar";
import Footer from "./Footer";
import {genre_hash, id_to_genre , table_headers} from './FavoritesHelper'
import {Link} from 'react-router-dom'
import { all } from 'axios';

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
      curr_page : 1,
      limit: 5,
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
             if(!unique_genres.includes(genre.name))
          	    unique_genres.push(genre.name);
         })
       }
    })
    return unique_genres
  }

  remove_favorites = (id)=>{
    console.log("entered remove section", id)
    let favs = this.state.movies.filter((favMovie)=>favMovie.id !== id)
    this.setState({movies: [...favs], filtered_movies: [...favs]})
    localStorage.setItem('favourites', JSON.stringify(favs));
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

  handlePopularitySortDesc = (movies)=> {
     movies = movies.sort(function(a,b){
      return b.popularity - a.popularity
     })
     this.setState({filtered_movies : [...movies]})
  }

  handlePopularitySortAsc = (movies)=> {
    movies = movies.sort(function(a,b){
     return a.popularity - b.popularity
    })
    this.setState({filtered_movies : [...movies]})
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

    let pages = filter_array.length / this.state.limit;
    let pages_array = []
    for(let i = 1; i <= pages ; ++i)
    {
      pages_array.push(i)
    }
    // this is the start index of current page
    let start_index = (this.state.curr_page - 1) * this.state.limit
    // this is the end  index of current page
    let end_index = start_index + this.state.limit

    filter_array = filter_array.slice(start_index, end_index)

    return (
      <div className='main favorites-tab'>
        <Navbar/>
        <div className='row '>
          <div className='col-3'>
            <div>
              <div className="d-flex flex-column justify-content-center flex-shrink-0 p-3 text-white bg-dark" style={{width: "280px"}}>
                <a  className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
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
                      this.state.genres.map((genre, index) => {
                        return(
                        <li key = {index}>
                          <a href = "#" className = {this.state.curr_genre === genre ? "nav-link active" : "nav-link text-white genre-btn"} onClick={()=>{this.setState({curr_genre: genre}, () => this.filter_movies())}}>
                            {genre}
                          </a>
                        </li>
                      )})
                    }
                </ul>
              </div>
            </div>
          </div>
          <div className="col-9 favourite-table">
            <div className='row main'>
              <div className="form-group has-search">
                <span className="fa fa-search form-control-feedback"></span>
                <input type="text" className="form-control" placeholder="Search Movie" value = {this.state.searched_text} onChange = { (e) => this.setState({searched_text: e.target.value})}/>
              </div>
            </div>
            <div className='row'>
              <table className="table">
                <thead>
                  <tr>
                    {
                      table_headers.map((header,index)=>{
                        return(
                          header === 'Popularity'
                          ? <div className = "popularity_sort" key = {index}> <i className = "fa fa-sort-up arrowUp-icon" onClick = {(e)=> {this.handlePopularitySortDesc(filter_array)}}> </i><i className = "fa fa-sort-down arrow-down" onClick={()=>{this.handlePopularitySortAsc(filter_array)}}> </i> <th scope="col" key = {index}>{header}</th> </div>
                          : <th scope="col" key = {index}>{header}</th>
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
                          <td><button type="button" id = {index} className="btn btn-danger" onClick = {()=>{this.remove_favorites(movie.id)}}>
                            Remove</button></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
            <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-center">
                {
                  pages_array.map((page) => {
                    return(
                      <li className ="page-item" key = {page} onClick = {(e) => this.setState({curr_page: e.target.innerText})}><a href = "#" className="page-link">{page}</a></li>
                    )
                  })
                }
              </ul>
            </nav>
          </div>
        </div>
      </div>
    )
  }
}
