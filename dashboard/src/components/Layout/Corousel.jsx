import React from "react";
import corouselImg01 from "../../assests/images/corouselImg01.avif";
import corouselImg02 from "../../assests/images/corouselImg02.avif";
import corouselImg03 from "../../assests/images/corouselImg03.avif";

const Corousel = () => {
  // Static product slides
  const slides = [
    {
      id: 1,
      title: "Solar Panel 200W",
      desc: "High-efficiency monocrystalline solar panel for home and commercial use.",
      img: corouselImg01,
    },
    {
      id: 2,
      title: "Smart Inverter 5KVA",
      desc: "Reliable power backup with Wi-Fi monitoring and advanced battery management.",
      img: corouselImg02,
    },
    {
      id: 3,
      title: "Lithium Battery Pack",
      desc: "Long-lasting 12V 100Ah lithium battery ideal for solar energy systems.",
      img: corouselImg03,
    },
  ];

  return (
    <div
      id="productCarousel"
      className="container carousel slide"
      data-bs-ride="carousel"
    >
      {/* Indicators */}
      <div className="carousel-indicators">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            data-bs-target="#productCarousel"
            data-bs-slide-to={i}
            className={i === 0 ? "active" : ""}
            aria-current={i === 0 ? "true" : "false"}
            aria-label={`Slide ${i + 1}`}
          ></button>
        ))}
      </div>

      {/* Slides */}
      <div className="carousel-inner">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`carousel-item ${i === 0 ? "active" : ""}`}
            style={{ height: "480px", overflow: "hidden" }}
          >
            <img
              src={slide.img}
              className="d-block w-100"
              alt={slide.title}
              style={{ objectFit: "cover", height: "100%" }}
            />
            <div
              className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3"
              style={{ bottom: "40px" }}
            >
              <h5 className="fw-bold text-white">{slide.title}</h5>
              <p className="text-light small">{slide.desc}</p>
              <button className="btn btn-primary btn-sm">
                Explore Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#productCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#productCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Corousel;
