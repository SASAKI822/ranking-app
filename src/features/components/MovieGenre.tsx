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
  const [popular, setPopular] = useState(false);
  const [release, setRelease] = useState(false);
  const [average, setAverage] = useState(false);
  const router = useRouter();

  const [movies, setMovies] = useState<Movie[]>([]);
  const setWatchList = useSetRecoilState(WatchListState);

  const handleChange = (e: any, value: any) => {
    e.preventDefault();
    setCurrentPage(value);
  };
  // fetchUrlのジャンルの映画が入る
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl + `&page=${currentPage}`);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchUrl, currentPage]);
  console.log(movies);

  // 人気順
  const handleFilterPopularDescMovie = (e: any) => {
    e.preventDefault();
    setRelease(false);
    setPopular(true);
    setAverage(false);
    async function fetchData() {
      const request = await axios.get(fetchUrl + `&page=${currentPage}`);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  };

  // 最近の映画
  const handleReleaseDateDescMovie = (e: any) => {
    setRelease(true);
    setPopular(false);
    setAverage(false);
    e.preventDefault();

    async function fetchData() {
      const request = await axios.get(
        fetchUrl + `&page=${currentPage}` + requests.filter.releaseDateDesc
      );
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  };

  //評価が高い順
  const handleVoteAverageDescMovie = (e: any) => {
    e.preventDefault();
    setRelease(false);
    setPopular(false);
    setAverage(true);
    async function fetchData() {
      const request = await axios.get(
        fetchUrl + requests.filter.voteAverageDesc + `&page=${currentPage}`
      );
      setMovies(request.data.results);
      return request;
    }
    fetchData();
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
          count={10}
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
