import React, { Component } from 'react'

export default class Navbar extends Component {
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
                <a className = "nav-link active" aria-current="page" href="/" onClick={()=>{this.setState({nav_link: 'home'})}}>Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/favourites">Favourites</a>
              </li>
              <li className="nav-item dropdown">
                <a className ="nav-link dropdown-toggle" href = "/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href  = "/">Series</a></li>
                  <li><a className="dropdown-item" href="/">Actors</a></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><a className="dropdown-item" href="/">Send Feedback</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href = "/">Login</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
