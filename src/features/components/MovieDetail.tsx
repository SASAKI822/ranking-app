import {
  MovieInfoState,
  RegisterActorListState,
  WatchListState,
} from "@/lib/atom";
import { API_KEY, requests } from "@/lib/MovieApi";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";

import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { TabContext, TabList } from "@mui/lab";
import TabPanel from "@mui/lab/TabPanel";

const MovieDetail = () => {
  const [movieCast, setMovieCast] = useState<any>([]);
  const [movieVideo, setMovieVideo] = useState<any>([]);
  const [trailerMovie, setTrailerMovie] = useState<any>([]);
  const setRegisterActorList = useSetRecoilState(RegisterActorListState);

  //MovieInfo　情報　id, title 取得
  const movieInfo = useRecoilValue(MovieInfoState);

  // ルーター string 型から number 型へ変換
  const router = useRouter();
  const title = router.query.title;
  const posterPath = router.query.posterPath;
  const overview = router.query.overview;
  const releaseDate = router.query.releaseDate;
  const movieOrTvDetailIdString: any = router.query.id;
  const movieOrTvDetailId = parseInt(movieOrTvDetailIdString);
  const movieDetailMediaType: any = router.query.mediaType;

  // メディアタイプによって格納先分ける
  useEffect(() => {
    // Tv 情報 cast 情報を格納
    if (
      movieDetailMediaType === "movie" ||
      movieDetailMediaType === null ||
      movieDetailMediaType === undefined ||
      movieDetailMediaType === ""
    ) {
      let ignore = false;

      const fetchData = async () => {
        if (!ignore) {
          const movieUrl = `https://api.themoviedb.org/3/movie/${movieOrTvDetailId}/videos?api_key=${API_KEY}`;
          const CastUrl = `https://api.themoviedb.org/3/movie/${movieOrTvDetailId}/credits?api_key=${API_KEY}`;

          const request = await axios
            .get(movieUrl)
            .then((response) => {
              setMovieVideo(response.data.results);
              // cast　情報をmovieCast に格納
              async function fetchMovieData() {
                const request = await axios
                  .get(CastUrl)
                  .then((response) => {
                    setMovieCast(response.data.cast);
                  })
                  .then((error) => {
                    console.error(error);
                  });

                return request;
              }
              fetchMovieData();
            })
            .then((error) => {
              console.error(error);
            });

          return request;
        }
      };
      fetchData();
      return () => {
        ignore = true;
      };
    } else if (movieDetailMediaType === "tv") {
      let ignoreTv = false;
      const fetchData = async () => {
        if (!ignoreTv) {
          const tvUrl = `https://api.themoviedb.org/3/tv/${movieOrTvDetailId}/videos?api_key=${API_KEY}`;
          const CastUrl = `https://api.themoviedb.org/3/tv/${movieOrTvDetailId}/aggregate_credits?api_key=${API_KEY}`;

          const request = await axios
            .get(tvUrl)
            .then((response) => {
              setMovieVideo(response.data.results);
              // cast　情報をtvCast に格納
              async function fetchMovieData() {
                const request = await axios
                  .get(CastUrl)
                  .then((response) => {
                    setMovieCast(response.data.cast);
                  })
                  .then((error) => {
                    console.error(error);
                  });
              }
              fetchMovieData();
            })
            .then((error) => {
              console.error(error);
            });
          return request;
        }
      };
      fetchData();
      return () => {
        ignoreTv = true;
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieOrTvDetailId]);

  // トレイラー動画だけtrailerMovieに格納
  useEffect(() => {
    {
      const trailerMovies = movieVideo.filter((value: any) => {
        return value.type === "Trailer";
      });

      setTrailerMovie(trailerMovies);
    }
  }, [movieVideo]);

  const [value, setValue] = useState("0");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const setWatchList = useSetRecoilState(WatchListState);

  return (
    <>
      <div style={{ marginBottom: "40px", padding: "20px" }}>
        <div style={{ display: "flex", padding: "5px" }}>
          <div style={{ marginBottom: "10px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${requests.image}/${posterPath}`} alt="movie image" />
          </div>
          <div style={{ width: "100%", padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1>{title}</h1>
            </div>

            <p>公開日:{releaseDate}</p>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    marginBottom: "30px",
                    width: "100%",
                  }}
                >
                  <TabList onChange={handleChange} aria-label="tab of number">
                    {trailerMovie.map((movie: any, index: any) => (
                      <Tab
                        key={index}
                        label={`${index}`}
                        style={{ color: "white" }}
                        value={index.toString()}
                      />
                    ))}
                  </TabList>
                  {trailerMovie.map((movie: any, index: any) => (
                    <TabPanel
                      key={movie.key}
                      value={index.toString()}
                      sx={{
                        "& .MuiTabPanel-root": {
                          border: "none",
                        },
                      }}
                    >
                      <iframe
                        id="inline-frame"
                        style={{
                          border: "none",
                          width: "560",
                          height: "315",
                          display: "block",
                        }}
                        src={`https://www.youtube.com/embed/${movie.key}`}
                      />
                    </TabPanel>
                  ))}
                </Box>
              </TabContext>
            </Box>
          </div>
        </div>
        <p>{overview}</p>
      </div>
      <ImageList
        gap={8}
        sx={{
          mb: 8,
          gridTemplateColumns:
            "repeat(auto-fill, minmax(180px, 1fr))!important",
        }}
        cols={4}
      >
        {movieCast &&
          movieCast.length > 0 &&
          movieCast.map((cast: any) => (
            <>
              {cast.profile_path && (
                <ImageListItem key={cast.img}>
                  <Link
                    style={{ textAlign: "center" }}
                    key={cast.id}
                    href={{
                      pathname: "/actor/[id]",
                      query: {
                        id: cast.id,
                        name: cast.name,
                        character: cast.character,
                      },
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${requests.image}${cast.profile_path}`}
                      alt="actor image"
                    />
                    <ImageListItemBar
                      title={cast.name}
                      subtitle={cast.character}
                      actionIcon={
                        <IconButton
                          sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                          aria-label={`info about ${cast.title}`}
                          onClick={(e: any) => {
                            e.preventDefault();
                            setRegisterActorList((a: any) => {
                              return [...a, cast];
                            });
                          }}
                        >
                          +
                        </IconButton>
                      }
                    />
                  </Link>
                </ImageListItem>
              )}
            </>
          ))}
      </ImageList>
    </>
  );
};

export default MovieDetail;
