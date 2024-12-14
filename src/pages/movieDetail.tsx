import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { DetailBox } from "./watchListDetails";
import { Loader } from "../components/Loader";
import { RenderError } from "../components/Error";
// import { MovieList } from "../components/MovieList";
import { movie
  // , MovieList 
} from "../components/MovieList";
import { useNavigate } from "react-router-dom";
import { PrevButton } from "../components/PrevButton";

interface MovieDetailProps {
  currentMovie: number;
  setStreaming: Function;
  setQueriedMovies: Function;
}

interface movieDetail {
  title: string;
  score: number;
  runtime: number;
  year: number;
  poster: string;
  description: string;
  genre: string[];
}

interface credit {
  profileImg: string | null;
  name: string;
  character: string;
  id: number;
}

const newMovie = {
  title: "title",
  score: 10,
  runtime: 90,
  year: 2021,
  poster: "data.poster_path",
  description: "data.overview",
  genre: ["data.genres.map((genre) => genre.name)"],
};

export function minutesToHours(minutes: any) {
  const hour = Math.trunc(minutes / 60);
  const minute = Math.trunc(minutes % 60);
  const convertHour = hour < 10 ? `0${hour}` : `${hour}`;
  const convertMinutes = minute < 10 ? `0${minute}` : `${minute}`;
  return `${convertHour}h ${convertMinutes}m`;
}

export default function MovieDetail({
  currentMovie,
  setStreaming,
  setQueriedMovies,
}: MovieDetailProps) {
  const [movie, setMovie] = useState<movieDetail>(newMovie);
  const [credits, setCredits] = useState<credit[]>([]);
  const [similarMovies, setSimilarMovies] = useState<movie[]>(Object);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const movieDataUrl = `https://api.themoviedb.org/3/movie/${currentMovie}?language=en-US`;
  const similarMoviesUrl = `https://api.themoviedb.org/3/movie/${currentMovie}/similar`;
  const creditsUrl = `https://api.themoviedb.org/3/movie/${currentMovie}/credits`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjA0ODNiMjRkYjY1NjM0MDdlZDNmZGM2YTc5NzJlZiIsIm5iZiI6MTczMjcwMjgxMi44MzE4ODcyLCJzdWIiOiI2NzNiODc2M2EwOTFjMDBhMTVhNmZjODEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6wc_qznWHlMOafLG7whOUzpHvy8KUOkCbOgFS0JSHAs",
    },
  };

  useEffect(function () {
    async function getMovieDetail() {
      try {
        setLoading(true);
        setError("");
        const [movieDataResponse, creditsDataResponse, similarMoviesResponse] =
          await Promise.all([
            fetch(movieDataUrl, options),
            fetch(creditsUrl, options),
            fetch(similarMoviesUrl, options),
          ]);
        if (!movieDataResponse.ok || !creditsDataResponse.ok) {
          throw new Error(
            "There was an error. Please check your internet connection"
          );
        }
        const [movieData, creditsData, similarMoviesData] = await Promise.all([
          movieDataResponse.json(),
          creditsDataResponse.json(),
          similarMoviesResponse.json(),
        ]);

        // edit movie data
        const newMovie = {
          imdbId: movieData.imdb_id,
          title: movieData.title,
          score: Math.round(movieData.vote_average * 10),
          runtime: movieData.runtime,
          year: movieData.release_date.slice(0, 4),
          poster: movieData.poster_path,
          description: movieData.overview,
          genre: movieData.genres.map((genre: any) => genre.name),
        };
        console.log(newMovie);
        setMovie(newMovie);
        setStreaming(newMovie.imdbId);
        // edit credits data
        const movieCreditsEdit = creditsData.cast.map((credit: any) => ({
          profileImg: credit.profile_path,
          name: credit.name,
          character: credit.character,
          id: credit.id,
        }));
        setCredits(movieCreditsEdit);
        console.log(movieCreditsEdit);

        // edit similar movies
        const similarMoviesEdit = similarMoviesData.results
          .slice(0, 10)
          .map((movie: any) => ({
            id: movie.id,
            Title: movie.title,
            Year: movie.release_date,
            Poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            description: movie.overview,
            score: Math.round(movie.vote_average * 10),
          }));
        setSimilarMovies(similarMoviesEdit);
        // console.log(similarMoviesData.results);
      } catch (error: any) {
        console.log(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getMovieDetail();
  }, []);

  const time = minutesToHours(movie.runtime);
  console.log(similarMovies);

  function HandleClickStream() {
    navigate("/streammovie");
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <RenderError message={error} />
      ) : (
        <div>
           <PrevButton
            onClick={() => {
              navigate(-1);
              setQueriedMovies(
                JSON.parse(localStorage.getItem("queriedMovies") || "[]")
              );
            }}
          /> 
          <div className="movie-details-container flex">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
              alt={movie.title}
              width="250px"
              height="350px"
            />

            <div className="movie-details flex">
              <div>
                <h2>
                  {movie.title} ({movie.year})
                </h2>
                <p>
                  {movie.genre?.join(", ")} . {time}
                </p>
              </div>
              <div className="overview">
                <h4 className="overview-title">Overview</h4>
                <p>{movie.description}</p>
              </div>
              <div className="flex buttons ">
                <DetailBox title="Score" metric={movie.score} />
                <Button className="movie-details-button">
                  Add to watchlist
                </Button>
                <Button
                  className="movie-details-button"
                  onClick={HandleClickStream}
                >
                  Stream Now
                </Button>
              </div>
            </div>
          </div>
          <div className="cast-container">
            <h5 style={{ marginBottom: "5px" }}>Cast</h5>
            <div className="cast-list flex">
              {credits?.map((credit) => (
                <Cast
                  key={credit.id}
                  img={`https://image.tmdb.org/t/p/w500${credit.profileImg}`}
                  name={credit.name}
                  character={credit.character}
                />
              ))}
            </div>
          </div>
          <button>back</button>
          {/* <MovieList list={similarMovies}>
            <h5>Related Movies</h5>
          </MovieList> */}
        </div>
      )}{" "}
    </>
  );
}

interface CastProps {
  img: string;
  name: string;
  character: string;
}

function Cast({ img, name, character }: CastProps) {
  return (
    <div className="cast">
      <img src={img} width="150px" height="225px" />
      <p className="cast-name">{name}</p>
      <p className="cast-role">{character}</p>
    </div>
  );
}
