import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function Carousel() {
  return (
    <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade bg-success"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="carousel-inner">
        <div className="carousel-item active d-flex flex-column justify-content-center align-items-center text-center px-3">
          <h1 className="text-white fw-bold lh-lg text-break">
            A BEAUTIFUL BLOG WITH NO IMAGES REQUIRED
          </h1>
          <div className="d-flex flex-column text-white align-items-center">
            <h4>By Zuka Amiridze</h4>
            <h4>5 comments</h4>
          </div>
          <div className="d-flex gap-3 mt-4">
            <button className="btn btn-outline bg-white rounded-0 btn-lg">
              Read On
            </button>
            <button className="btn btn-outline-white border border-white text-white rounded-0">
              Read Later
            </button>
          </div>
        </div>
        <div className="carousel-item d-flex flex-column justify-content-center align-items-center text-center px-3">
          <h1 className="text-white fw-bold lh-lg">
            WHAT COULD POSSIBLY GO WRONG?
          </h1>
          <div className="d-flex flex-column text-white align-items-center">
            <h4>By Zuka Amiridze</h4>
            <h4>3 comments</h4>
          </div>
          <div className="d-flex gap-3 mt-4">
            <button className="btn btn-outline bg-white rounded-0 btn-lg">
              Read On
            </button>
            <button className="btn btn-outline-white border border-white text-white rounded-0">
              Read Later
            </button>
          </div>
        </div>
        <div className="carousel-item d-flex flex-column justify-content-center align-items-center text-center px-3">
          <h1 className="text-white fw-bold lh-lg">
            THE SIMPLEST WAYS TO CHOOSE THE BEST COFFEE
          </h1>
          <div className="d-flex flex-column text-white align-items-center">
            <h4>By Zuka Amiridze</h4>
            <h4>2 comments</h4>
          </div>
          <div className="d-flex gap-3 mt-4">
            <button className="btn btn-outline bg-white rounded-0 btn-lg">
              Read On
            </button>
            <button className="btn btn-outline-white border border-white text-white rounded-0">
              Read Later
            </button>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousel;
