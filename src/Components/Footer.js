import React, { Component } from 'react'
let icons =["fab fa-google icon-footer", "fab fa-linkedin icon-footer", "fab fa-github icon-footer"]
export default class Footer extends Component {
  render() {
    return (
      <footer className="footer mt-3 py-1 bg-dark">
        <div className="container text-center ">
           {
            icons.map( (icon,index) => {
              return(
              <a className = "m-1 text-white mx-3 fs-3 " href="#" role="button" key = {index}>
              <i className={icon}></i>
              </a>
            )})
           }
            <div className="text-center mt-2">
              <a className="text-white footer-text" href="#">&#169;{new Date().getFullYear()} MovieMaker.com</a>
            </div>
        </div>
      </footer>
    )
  }
}
