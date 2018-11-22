import React from "react";

const Movies = props => (
  <div className="container">
    {props.movies.map(movie => {
      return (
          <div className="movies__box" key={ movie.id }>
            <img
              className="movie__box-img"
              src={ movie.picture }
              alt={ movie.title }
            />
            <div className="movie__text">
              <h5 className="movies__title">
                { movie.title }
              </h5>
              <div className="movies__subtitle">
                <p>Genre: <span> { movie.genre.map(x => x.join(', ')) } </span> </p>
                <p>IMDB Rating: <span> { movie.imdb } </span> </p>
                <p>Year: <span>  {movie.year} </span></p>
                <p>Amazon rating:
                <span className="amazon_details">
                  {movie.star_rating} stars, based on {movie.star_count} customer reviews </span>
                </p>
              </div>
              <div className="tooltip">
                <span className="tooltiptext">{movie.synopsis}</span>
              </div>
            </div>
              <a
                className = "movie_buttons"
                target = "_blank"
                rel = "noopener noreferrer"
                href = { movie.url }
              >View Movie</a>
        </div>
      );
    })
  }
  </div>
);

export default Movies;
