import React, { Component } from 'react'
let icons =[{name: "fab fa-google icon-footer", link: '/' }, {name:"fab fa-linkedin icon-footer", link: '#'},{name: "fab fa-github icon-footer", link: "https://github.com/AshishK-10/MovieApp"}]
export default class Footer extends Component {
  render() {
    return (
      <footer className="footer mt-3 py-1 bg-dark">
        <div className="container text-center ">
           {
            icons.map( (icon,index) => {
              return(
              <a className = "m-1 text-white mx-3 fs-3 " href={icon.link} role="button" key = {index}>
              <i className={icon.name}></i>
              </a>
            )})
           }
            <div className="text-center mt-2">
              <a className="text-white footer-text" style={{textDecoration:"none"}} href="/">&#169;{new Date().getFullYear()} MovieMaker.com</a>
            </div>
        </div>
      </footer>
    )
  }
}
