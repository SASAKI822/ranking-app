import { requests } from "@/lib/MovieApi";
import axios from "axios";

import { useEffect, useState, useRef } from "react";
import { Movie } from "./MovieList";

type SearchProps = {
  searchUrl: string;
};

type SearchType = {};
const MovieSearch: any = ({ searchUrl }: SearchProps) => {
  const [keyword, setKeyword] = useState("ハリー");
  const [searchMovie, setSearchMovie] = useState<Movie[]>([]);

  const inputElement: any = useRef("");

  const onSearch = (e: any) => {
    e.preventDefault();
    setKeyword(inputElement.current.value);
    console.log(searchMovie);
  };

  useEffect(() => {
    async function SearchData() {
      const request = await axios
        .get(searchUrl, {
          params: {
            query: keyword,
            page: 1,
          },
        })
        .then((response) => {
          const data = response.data.results;

          setSearchMovie(data);
          //console.log(data);
        });

      return request;
    }
    SearchData();
  }, [searchUrl, keyword]);
  return (
    <>
      <form action="" onSubmit={onSearch}>
        <input type="text" ref={inputElement} />
      </form>
      <ul>
        {searchMovie.map((movie: any) => (
          <>
            <li>
              <span>{movie.title}</span>
              <img src={`${requests.image}${movie.poster_path}`} alt="" />
            </li>
          </>
        ))}
      </ul>
    </>
  );
};

export default MovieSearch;
