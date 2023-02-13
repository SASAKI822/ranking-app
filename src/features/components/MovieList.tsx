import * as React from "react";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useSetRecoilState } from "recoil";
import { searchKey } from "../../lib/atom";
import { useRecoilValue } from "recoil";

type SearchProps = {
  searchUrl: string;
};

// Header コンポーネント

const MovieList = ({ searchUrl }: SearchProps) => {
  // Input入力値をKeyword に入れる

  const setKeyword = useSetRecoilState(searchKey);
  const keyword = useRecoilValue(searchKey);
  const [searchMovie, setSearchMovie] = useState<Movie[]>([]);
  const inputElement: any = useRef(null);

  console.log(keyword);
  // Enterキーを押すと起動され入力値をKeywordに入れる
  const onSearch = (e: any) => {
    e.preventDefault();
    setKeyword(inputElement.current.value);
  };

  const handleMovieDetail = (e: any) => {};

  // keyword に応じたapiを取得し、searchMovieにdataを格納する。
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
        })
        .catch((error) => {
          console.log(error.response);
        });

      return request;
    }
    SearchData();
  }, [searchUrl, keyword]);
  console.log(searchMovie);
  return (
    <>
      <div>
        {searchMovie.map((movie: any) => {
          return (
            <>
              <div style={{ width: "70%" }}>
                <Link
                  href={{
                    pathname: `/movie/${movie.id}`,
                    query: { id: movie.id, title: movie.title },
                  }}
                >
                  <h2>{movie.title}</h2>
                </Link>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
export default MovieList;
