import React, { Component } from 'react'

export default class Navbar extends Component {
  constructor(){
    super()
    this.state = {
      curr_selected: [],
    }
  }

  componentDidMount(){
    this.setState({
      curr_selected: JSON.parse(localStorage.getItem('nav-selected') == null
                        ? "[]"
                        : localStorage.getItem('nav-selected')),
    })
  }

  handleNavChange = (e)=>{
    let change = []
    change.push(e)
    localStorage.setItem('nav-selected', JSON.stringify(change));
    this.setState({ curr_selected : [...change] })
  }

  render() {
    return (
      <nav className="navbar navbar-brand fixed-top navbar-expand-lg navbar-dark bg-dark home-nav">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={require('./../icon-image.jpeg')} alt="" width="140" height="50"/>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className = {this.state.curr_selected.length > 0 && this.state.curr_selected[0] === "home" ? "nav-link active" : "nav-link"} aria-current="page" href="/" onClick={()=>this.handleNavChange('home')}>Home</a>
              </li>
              <li className="nav-item">
                <a className={this.state.curr_selected.length > 0 && this.state.curr_selected[0] === "favorites" ? "nav-link active" : "nav-link"} href="/favourites" onClick={()=>this.handleNavChange('favorites')}>Favourites</a>
              </li>
            </ul>
            <div className="d-flex nav-item dropdown navbar-dropdown">
                <a className ="nav-link dropdown-toggle" href = "#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="https://github.com/AshishK-10/MovieApp">Visit GitHub</a></li>
                </ul>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
