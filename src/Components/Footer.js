import React, { Component } from 'react'
export default class Footer extends Component {
  render() {
    return (
      <footer class="text-center text-white footer-main-div bg-dark">
        <div class="container pt-4">
          <section class="mb-4">

            <a className = "btn btn-link btn-floating btn-lg m-1 text-black" href="#!" role="button" data-mdb-ripple-color="dark">
              <i class="fab fa-google"></i>
            </a>

            <a
              class="btn btn-link btn-floating btn-lg m-1 text-black"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
              ><i class="fab fa-linkedin"></i>
            </a>

            <a
              class="btn btn-link btn-floating btn-lg m-1 text-black"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
              ><i class="fab fa-github"></i>
            </a>

          </section>
        </div>
        <div class="text-center footer-lower">
          <a class="text-white" href="#">{new Date().getFullYear()} MovieMaker.com</a>
        </div>
      </footer>
    )
  }
}
