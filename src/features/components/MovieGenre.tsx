import { uIdState, WatchListState } from "@/lib/atom";
import { requests } from "@/lib/MovieApi";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";

type Props = {
  fetchUrl: string;
  title: string;
};

export type Movie = {
  id: string;
  name: string;
  img: string;
  title: string;
  media_type: string;
  overview: string;
  release_date: string;
  video: string;
  poster_path: string;
  backdrop_path: string;
};

const MovieGenre = ({ title, fetchUrl }: Props) => {
  // ページネーション　現在のページ
  const [currentPage, setCurrentPage] = useState(1);
  // ユーザーid
  const [userId, setUserId] = useRecoilState(uIdState);
  // フィルター　年
  const [year, setYear] = useState(new Date().getFullYear());
  const [popular, setPopular] = useState(true);
  const [release, setRelease] = useState(false);
  const [average, setAverage] = useState(false);

  const [movies, setMovies] = useState<Movie[]>([
    {
      id: "",
      name: "",
      img: "",
      title: "",
      media_type: "",
      overview: "",
      release_date: "",
      video: "",
      poster_path: "",
      backdrop_path: "",
    },
  ]);
  // 見る映画リスト
  const [watchList, setWatchList] = useRecoilState(WatchListState);

  // フィルター　年
  const allYears = [];
  const thisYear: number = new Date().getFullYear();
  for (let i = 1990; i <= thisYear; i++) {
    allYears.unshift(i);
  }
  const yearList = allYears.map((value: number) => {
    return <option key={value}>{value}</option>;
  });

  // ページネーション
  const [page, setPage] = useState(20);
  const handleChange = (e: { preventDefault: () => void }, value: number) => {
    e.preventDefault();
    setCurrentPage(value);
  };

  // fetchUrlのジャンルの映画が入る
  // 人気順
  useEffect(() => {
    if (popular) {
      const fetchData = async () => {
        const request = await axios.get(
          fetchUrl + `&page=${currentPage}` + `&year=${year}`
        );
        setPage(request.data.total_pages);
        setMovies(request.data.results);
        return request;
      };
      fetchData();
    }
  }, [fetchUrl, currentPage, year, popular]);

  // 最近の映画
  useEffect(() => {
    if (release) {
      const fetchData = async () => {
        const request = await axios.get(
          fetchUrl +
            `&page=${currentPage}` +
            requests.FILTER.RELEASE_DATE_DESC +
            `&year=${year}`
        );
        setPage(request.data.total_pages);
        setMovies(request.data.results);
        return request;
      };
      fetchData();
    }
  }, [fetchUrl, currentPage, year, release]);

  //評価が高い順
  useEffect(() => {
    if (average) {
      const fetchData = async () => {
        const request = await axios.get(
          fetchUrl +
            `&page=${currentPage}` +
            requests.FILTER.VOTE_AVERAGE_DESC +
            `&year=${year}`
        );
        setPage(request.data.total_pages);
        setMovies(request.data.results);
        return request;
      };
      fetchData();
    }
  }, [fetchUrl, currentPage, year, average]);

  // 人気順
  const handleFilterPopularDescMovie = () => {
    setPopular(true);
    setRelease(false);
    setAverage(false);
    setCurrentPage(1);
  };

  // 最近の映画
  const handleReleaseDateDescMovie = () => {
    setRelease(true);
    setPopular(false);
    setAverage(false);
    setCurrentPage(1);
  };

  //評価が高い順
  const handleVoteAverageDescMovie = () => {
    setRelease(false);
    setPopular(false);
    setAverage(true);
    setCurrentPage(1);
  };

  // 映画追加
  const handleAddWatch = async (
    e: React.MouseEvent<HTMLInputElement>,
    movie: Movie
  ) => {
    e.preventDefault();

    // 映画重複フィルター
    const containMovie = watchList.find((watchItem: any) => {
      return watchItem.id === movie.id;
    });

    // 登録されていなければ登録
    if (!containMovie) {
      const collectionPath = collection(db, "users", userId, "movies");
      // Firestoreに登録
      addDoc(collectionPath, {
        id: movie.id,
        title: movie.title ? movie.title : "",
        mediaType: movie.media_type ? movie.media_type : "",
        releaseDate: movie.release_date ? movie.release_date : "",
        video: movie.video ? movie.video : "",
        overview: movie.overview ? movie.overview : "",
        posterPath: movie.poster_path ? movie.poster_path : "",
      }).then(() => {
        setWatchList([...watchList, movie]);
      });
      // 登録されていればアラート
    } else {
      window.alert("すでに追加されています。");
    }
  };
  // 　映画追加

  return (
    <>
      <div style={{ marginTop: "20px", padding: "10px" }}>
        <h2>
          {title}
          {popular ? (
            <span style={{ fontSize: "16px" }}> 人気順 {year}</span>
          ) : (
            ""
          )}
          {release ? (
            <span style={{ fontSize: "16px" }}> 最新順 {year}</span>
          ) : (
            ""
          )}
          {average ? (
            <span style={{ fontSize: "16px" }}> 評価順 {year}</span>
          ) : (
            ""
          )}
        </h2>
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
          movies.map((movie: Movie) => {
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
                      src={`${requests.IMAGE}${movie.poster_path}`}
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
                            handleAddWatch(e, movie);
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
          count={page}
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
          page={currentPage}
          onChange={handleChange}
          size="large"
        />
      </Stack>
    </>
  );
};

export default MovieGenre;
