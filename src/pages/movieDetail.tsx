import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { DetailBox } from "./watchListDetails";
import { Loader } from "../components/Loader";
import { RenderError } from "../components/Error";
import { movie } from "../components/MovieList";
import { useNavigate, useParams } from "react-router-dom";
import { PrevButton } from "../components/PrevButton";
import { useWatchlist } from "../contexts/watchlistsContext";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import authFetch from "../utils/authFetch";
import { API_URL } from "../utils/config";

interface movieDetail {
  imdbId: string;
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
  imdbId: "",
  title: "title",
  score: 10,
  runtime: 90,
  year: 2021,
  poster: "data.poster_path",
  description: "data.overview",
  genre: ["data.genres.map((genre) => genre.name)"],
};

export function minutesToHours(minutes: number) {
  const hour = Math.trunc(minutes / 60);
  const minute = Math.trunc(minutes % 60);
  const convertHour = hour < 10 ? `0${hour}` : `${hour}`;
  const convertMinutes = minute < 10 ? `0${minute}` : `${minute}`;
  return `${convertHour}h ${convertMinutes}m`;
}

export default function MovieDetail() {
  const [movie, setMovie] = useState<movieDetail>(newMovie);
  const [credits, setCredits] = useState<credit[]>([]);
  const [similarMovies, setSimilarMovies] = useState<movie[]>(Object);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { currentMovie } = useParams();
  const { watchLists } = useWatchlist();

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
          genre: movieData.genres.map((genre: { name: string }) => genre.name),
        };
        console.log(newMovie);
        setMovie(newMovie);

        // edit credits data
        const movieCreditsEdit = creditsData.cast.map(
          (credit: {
            profile_path: string | null;
            name: string;
            character: string;
            id: number;
          }) => ({
            profileImg: credit.profile_path,
            name: credit.name,
            character: credit.character,
            id: credit.id,
          })
        );
        setCredits(movieCreditsEdit);
        console.log(movieCreditsEdit);

        // edit similar movies
        const similarMoviesEdit = similarMoviesData.results
          .slice(0, 10)
          .map(
            (movie: {
              id: number;
              title: string;
              release_date: string;
              poster_path: string | null;
              overview: string;
              vote_average: number;
            }) => ({
              id: movie.id,
              Title: movie.title,
              Year: movie.release_date,
              Poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              description: movie.overview,
              score: Math.round(movie.vote_average * 10),
            })
          );
        setSimilarMovies(similarMoviesEdit);
        // console.log(similarMoviesData.results);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    }
    getMovieDetail();
  }, []);

  const time = minutesToHours(movie.runtime);
  console.log(similarMovies);

  function HandleClickStream() {
    navigate(`/streammovie/${movie.imdbId}`);
  }
  async function handleAddMovieToWatchlist(watchlistId: string) {
    try {
      const res = await authFetch(
        `${API_URL}/watchlists/${watchlistId}/movies`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            ...movie,
            id:currentMovie,
            poster: `https://image.tmdb.org/t/p/w500${movie.poster}`,
          }),
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <RenderError message={error} />
      ) : (
        <div>
          <PrevButton />
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
              <div style={{ position: "relative" }} className="flex buttons ">
                <DetailBox title="Score" metric={movie.score} />
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button className="movie-details-button">
                      Add to watchlist
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content className="movie-details-dropdown">
                      {watchLists.map((watchlist) => (
                        <DropdownMenu.Item
                          key={watchlist._id}
                          onClick={() =>
                            handleAddMovieToWatchlist(watchlist._id)
                          }
                          style={{ padding: "10px", cursor: "pointer" }}
                        >
                          {watchlist.name}
                        </DropdownMenu.Item>
                      ))}
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
                {/* 
                <div
                  style={{
                    position: "absolute",
                    backgroundColor: "grey",
                    padding: "10px",
                    top: "70px",
                    zIndex: 5,
                    color: "white",
                  }}
                >
                  {watchLists.map((watchlist) => (
                    <p>{watchlist.name}</p>
                  ))}
                </div> */}
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
