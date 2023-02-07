import { requests } from "@/lib/MovieApi";
import axios from "axios";
import { useEffect, useState } from "react";

type Props = {
  fetchUrl: string;
  title: string;
};

export type Movie = {
  id: string;
  name: string;
  title: string;
  poster_path: string;
  backdrop_path: string;
};

const MovieList: any = ({ title, fetchUrl }: Props) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      //console.log(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchUrl]);

  return (
    <>
      <ul>
        {movies.map((movie) => (
          <>
            <li>
              <span>{movie.name}</span>
              <img src={`${requests.image}${movie.poster_path}`} alt="" />
            </li>
          </>
        ))}
      </ul>
    </>
  );
};

export default MovieList;
