import { WatchListState } from "@/lib/atom";
import { requests } from "@/lib/MovieApi";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";

type Props = {
  fetchUrl: string;
  title: string;
  pageId: any;
  GenreName: any;
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
  const [currentPage, setCurrentPage] = useState(1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [popular, setPopular] = useState(true);
  const [release, setRelease] = useState(false);
  const [average, setAverage] = useState(false);
  const router = useRouter();

  const [movies, setMovies] = useState<Movie[]>([]);
  const setWatchList = useSetRecoilState(WatchListState);

  const allYears = [];
  const thisYear = new Date().getFullYear();
  for (let i = 1990; i <= thisYear; i++) {
    allYears.unshift(i);
  }

  const yearList = allYears.map((value: any) => {
    return <option key={value}>{value}</option>;
  });

  const handleChange = (e: any, value: any) => {
    e.preventDefault();
    setCurrentPage(value);
  };
  // fetchUrlのジャンルの映画が入る

  // 人気順
  useEffect(() => {
    if (popular) {
      async function fetchData() {
        const request = await axios.get(
          fetchUrl + `&page=${currentPage}` + `&year=${year}`
        );
        setMovies(request.data.results);
        return request;
      }
      fetchData();
    }
  }, [fetchUrl, currentPage, year, popular]);

  // 最近の映画
  useEffect(() => {
    if (release) {
      async function fetchData() {
        const request = await axios.get(
          fetchUrl +
            `&page=${currentPage}` +
            requests.filter.releaseDateDesc +
            `&year=${year}`
        );
        setMovies(request.data.results);
        return request;
      }
      fetchData();
    }
  }, [fetchUrl, currentPage, year, release]);

  //評価が高い順
  useEffect(() => {
    if (average) {
      async function fetchData() {
        const request = await axios.get(
          fetchUrl +
            `&page=${currentPage}` +
            requests.filter.voteAverageDesc +
            `&year=${year}`
        );
        setMovies(request.data.results);
        return request;
      }
      fetchData();
    }
  }, [fetchUrl, currentPage, year, average]);

  // 人気順
  const handleFilterPopularDescMovie = (e: any) => {
    setPopular(true);
    setRelease(false);
    setAverage(false);
    setCurrentPage(1);
    e.preventDefault();
  };

  // 最近の映画
  const handleReleaseDateDescMovie = (e: any) => {
    setRelease(true);
    setPopular(false);
    setAverage(false);
    setCurrentPage(1);
    e.preventDefault();
  };

  //評価が高い順
  const handleVoteAverageDescMovie = (e: any) => {
    setRelease(false);
    setPopular(false);
    setAverage(true);
    setCurrentPage(1);
    e.preventDefault();
  };

  console.log(currentPage);
  return (
    <>
      <div style={{ marginTop: "20px", padding: "10px" }}>
        <h2>{title}</h2>
        <button
          style={{ marginRight: "10px" }}
          onClick={handleFilterPopularDescMovie}
        >
          人気順
        </button>
        <button
          style={{ marginRight: "10px" }}
          onClick={handleReleaseDateDescMovie}
        >
          最近の映画
        </button>
        <button
          style={{ marginRight: "10px" }}
          onClick={handleVoteAverageDescMovie}
        >
          評価の高い順
        </button>
        <select
          onChange={(e: any) => {
            setYear(e.target.value);
            setCurrentPage(1);
          }}
        >
          {yearList}
        </select>
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
                      }}
                      title={movie.title}
                      actionIcon={
                        <IconButton
                          sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                          aria-label={`info about ${movie.title}`}
                          onClick={(e: any) => {
                            e.preventDefault();
                            setWatchList((a: any) => {
                              return [...a, movie];
                            });
                          }}
                        >
                          +
                        </IconButton>
                      }
                    />
                  </Link>
                </ImageListItem>
              </>
            );
          })}
      </ImageList>
      <Stack spacing={2} sx={{ color: "white", margin: "40px 0" }}>
        <Pagination
          count={100}
          variant="outlined"
          shape="rounded"
          color={"standard"}
          sx={{
            "&. MuiPagination-ul": {
              backgroundColor: "#0f0f0f",
            },
            background: "white",
            margin: "auto",
            textAlign: "center",
            padding: "20px",
            color: "white",
          }}
          onChange={handleChange}
          size="large"
        />
      </Stack>
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
