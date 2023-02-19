import { MovieGenreIdState, WatchListState } from "@/lib/atom";
import { requests } from "@/lib/MovieApi";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

type Props = {
  fetchUrl: string;
  title: string;
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

const MovieGenre: any = ({ title, fetchUrl }: Props) => {
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

  // 人気順
  const handleFilterPopularDescMovie = (e: any) => {
    e.preventDefault();

    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  };

  // 最近の映画
  const handleReleaseDateDescMovie = (e: any) => {
    e.preventDefault();

    async function fetchData() {
      const request = await axios.get(
        fetchUrl + requests.filter.releaseDateDesc
      );
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  };

  //評価が高い順
  const handleVoteAverageDescMovie = (e: any) => {
    e.preventDefault();

    async function fetchData() {
      const request = await axios.get(
        fetchUrl + requests.filter.voteAverageDesc
      );
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  };

  return (
    <>
      <div style={{ marginTop: "20px", padding: "10px" }}>
        <h2>{title}</h2>

        <button onClick={handleFilterPopularDescMovie}>人気順</button>
        <button onClick={handleReleaseDateDescMovie}>最近の映画</button>
        <button onClick={handleVoteAverageDescMovie}>評価の高い順</button>
      </div>
      <ImageList
        gap={8}
        sx={{
          mb: 8,
          mt: 8,
          gridTemplateColumns:
            "repeat(auto-fill, minmax(180px, 1fr))!important",
        }}
      >
        {movies &&
          movies.length > 0 &&
          movies.map((movie: any) => {
            return (
              <>
                <ImageListItem
                  key={movie.img}
                  sx={{ maxWidth: "185px", placeSelf: "center" }}
                >
                  <Link
                    style={{ textAlign: "center", maxWidth: "185px" }}
                    href={{
                      pathname: `/movie/${movie.id}`,
                      query: {
                        id: movie.id,
                        title: movie.title,
                        overview: movie.overview,
                        releaseDate: movie.release_date,
                        posterPath: movie.poster_path,
                      },
                    }}
                  >
                    <img
                      src={`${requests.image}${movie.poster_path}`}
                      alt=""
                      style={{ backgroundColor: "#dbdbdb" }}
                    />

                    <ImageListItemBar
                      sx={{
                        "& .MuiImageListItemBar-title": {
                          textAlign: "start",
                          overflow: "auto",
                          whiteSpace: "normal",
                        },
                        "& .MuiImageListItemBar-positionBottom ": {
                          background: "rgba(255, 255, 255, 0.94)",
                        },
                        "& .MuiImageListItemBar-titleWrap ": {
                          padding: "10px",
                        },
                      }}
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
              </>
            );
          })}
      </ImageList>
    </>
  );
};

export default MovieGenre;
{
  /* <IconButton
                          sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                          aria-label={`info about ${movie.title}`}
                          onClick={() => {
                            setWatchList((a: any) => {
                              return [...a, movie];
                            });
                          }}
                        ></IconButton> */
}
