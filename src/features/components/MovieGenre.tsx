import { MovieGenreIdState, WatchListState } from "@/lib/atom";
import { requests } from "@/lib/MovieApi";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

type Props = {
  fetchUrl: string;
  title: string;
  filterUrl: string;
  filterAscUrl: string;
  filterDescUrl: string;
};

export type Movie = {
  id: string;
  name: string;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
};

const MovieGenre: any = ({
  title,
  fetchUrl,
  filterAscUrl,
  filterDescUrl,
}: Props) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const setWatchList = useSetRecoilState(WatchListState);

  // fetchUrlのジャンルの映画が入る
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchUrl]);
  console.log(movies);

  const handleFilterAscMovie = (e: any) => {
    e.preventDefault();

    async function fetchData() {
      const request = await axios.get(filterAscUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  };
  const handleFilterDescMovie = (e: any) => {
    e.preventDefault();

    async function fetchData() {
      const request = await axios.get(filterDescUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  };
  return (
    <>
      <ul>
        <h2>{title}</h2>
      </ul>
      <button onClick={handleFilterAscMovie}>昇順</button>
      <button onClick={handleFilterDescMovie}>降順</button>

      <ImageList
        gap={12}
        sx={{
          mb: 8,
          gridTemplateColumns:
            "repeat(auto-fill, minmax(200px, 1fr) 1fr)!important",
        }}
        cols={4}
      >
        {movies &&
          movies.length > 0 &&
          movies.map((movie) => {
            return (
              <>
                <div key={movie.id}>
                  <ImageListItem key={movie.img}>
                    <Link
                      href={{
                        pathname: `/movie/${movie.id}`,
                        query: {
                          id: movie.id,
                          title: movie.name,
                          overview: movie.overview,
                          releaseDate: movie.release_date,
                        },
                      }}
                    >
                      <img
                        src={`${requests.image}${movie.poster_path}`}
                        alt=""
                      />

                      <ImageListItemBar
                        title={movie.name}
                        subtitle={movie.title}
                        actionIcon={
                          <IconButton
                            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                            aria-label={`info about ${movie.title}`}
                            onClick={() => {
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

export default MovieGenre;
