import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { requests } from "@/lib/MovieApi";
import Link from "next/link";
import { useSetRecoilState } from "recoil";
import { searchKey, WatchListState } from "../../lib/atom";
import { useRecoilValue } from "recoil";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

type SearchProps = {
  searchUrl: string;
};

// 検索結果に応じた内容を表示するコンポーネント

const SearchMovieList = ({ searchUrl }: SearchProps) => {
  // Input入力値をKeyword に入れる

  const setKeyword = useSetRecoilState(searchKey);
  const keyword = useRecoilValue(searchKey);
  const [searchMovie, setSearchMovie] = useState<Movie[]>([]);

  const setWatchList = useSetRecoilState(WatchListState);

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
      <ImageList
        gap={8}
        cols={4}
        sx={{
          gridTemplateColumns:
            "repeat(auto-fill, minmax(200px, 1fr) 1fr!important",
        }}
      >
        {searchMovie &&
          searchMovie.length > 0 &&
          searchMovie.map((movie: any) => {
            return (
              <>
                <div key={movie.id}>
                  <ImageListItem key={movie.img}>
                    <Link
                      href={{
                        pathname: `/movie/${movie.id}`,
                        query: {
                          id: movie.id,
                          title: movie.title,
                          overview: movie.overview,
                          releaseDate: movie.release_date,
                          video: movie.video,
                        },
                      }}
                    >
                      <img
                        src={`${requests.image}${movie.poster_path}`}
                        alt=""
                      />

                      <ImageListItemBar
                        title={movie.title}
                        subtitle={movie.author}
                        actionIcon={
                          <IconButton
                            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                            aria-label={`info about ${movie.title}`}
                            // 見た映画登録ボタン
                            onClick={(e: any) => {
                              e.preventDefault();
                              setWatchList((a: any) => {
                                return [...a, movie];
                              });
                            }}
                          >
                            <InfoIcon />
                          </IconButton>
                        }
                      />
                    </Link>
                  </ImageListItem>
                </div>
              </>
            );
          })}
      </ImageList>
    </>
  );
};
export default SearchMovieList;
