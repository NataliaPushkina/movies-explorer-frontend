import "./MoviesCardList.css";
import MovieCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ onCheckButtonClick, movies }) {
  return (
    <section className="section__movies-card-list">
      <ul className="movies-card-list__list">
        {movies.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              name={movie.nameRU}
              link={`https://api.nomoreparties.co${movie.image.url}`}
              duration={movie.duration}
              onCheckButtonClick={onCheckButtonClick}
            />
          );
        })}

      </ul>
    </section>
  );
}

export default MoviesCardList;
