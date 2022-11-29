import React, { Component } from 'react'

export default class NoPage extends Component {
  render() {
    return (
      <body className = "nopage_body">
        <section className="notFound">
            <div className="img no_page">
            <img src="https://assets.codepen.io/5647096/backToTheHomepage.png" alt="Back to the Homepage"/>
            <img src="https://assets.codepen.io/5647096/Delorean.png" alt="El Delorean, El Doc y Marti McFly"/>
            </div>
            <div className="text no_page">
            <h1>404</h1>
            <h2>PAGE NOT FOUND</h2>
            <h4><a href="/" className="yes">BACK TO HOME?</a></h4>
            </div>
        </section>
      </body>
    )
  }
}
