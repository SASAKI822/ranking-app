import { MovieInfoState } from "@/lib/atom";
import { API_KEY, requests } from "@/lib/MovieApi";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

const MovieDetail = () => {
  const [movieCast, setMovieCast] = useState<any>([]);
  const [movieVideo, setMovieVideo] = useState<any>([]);
  const [seasonInfo, setSeasonInfo] = useState<any>([]);
  const [trailerMovie, setTrailerMovie] = useState<any>([]);

  //MovieInfo　情報　id, title 取得
  const movieInfo = useRecoilValue(MovieInfoState);

  // ルーター string 型から number 型へ変換

  const router = useRouter();
  const movieOrTvDetailIdString: any = router.query.id;
  const movieOrTvDetailId = parseInt(movieOrTvDetailIdString);
  const movieDetailMediaType: any = router.query.mediaType;
  console.log(movieDetailMediaType);
  const movieUrl = `https://api.themoviedb.org/3/movie/${movieOrTvDetailId}/videos?api_key=${API_KEY}`;

  const CastUrl = `https://api.themoviedb.org/3/movie/${movieOrTvDetailId}/credits?api_key=${API_KEY}`;
  const seasonTv = `https://api.themoviedb.org/3/tv/${movieOrTvDetailId}aggregate_credits?api_key=${API_KEY}`;
  console.log(seasonTv);
  if (
    movieDetailMediaType === "movie" ||
    movieDetailMediaType === null ||
    movieDetailMediaType === undefined ||
    movieDetailMediaType === ""
  ) {
    useEffect(() => {
      let ignore = false;

      async function fetchData() {
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
      }
      fetchData();
      return () => {
        let ignore = true;
      };
    }, [movieOrTvDetailId]);
  } else if (movieDetailMediaType === "tv") {
    // Tv 情報 cast 情報を格納
    useEffect(() => {
      let ignoreTv = false;
      const fetchData = async () => {
        if (!ignoreTv) {
          const seasonTv = `https://api.themoviedb.org/3/tv/${movieOrTvDetailId}/aggregate_credits?api_key=${API_KEY}`;
          const tvUrl = `https://api.themoviedb.org/3/tv/${movieOrTvDetailId}/videos?api_key=${API_KEY}`;
          const CastUrl = `https://api.themoviedb.org/3/tv/${movieOrTvDetailId}/credits?api_key=${API_KEY}`;
          console.log(seasonTv);
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
                    async function fetchSeasonData() {
                      const request = await axios
                        .get(seasonTv)
                        .then((response) => {
                          setSeasonInfo(response.data.cast);
                        });
                      return request;
                    }
                    fetchSeasonData();
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
        let ignoreTv = true;
      };
    }, [movieOrTvDetailId]);
  }
  console.log(seasonInfo);
  // // トレイラー動画だけtrailerMovieに格納
  useEffect(() => {
    {
      const trailerMovies = movieVideo.filter((value: any) => {
        return value.type === "Trailer";
      });

      setTrailerMovie(trailerMovies);
    }
  }, [movieVideo]);
  console.log(movieCast);
  // //atom 参照　検索結果リスト
  // const [actorMovies, setActorMovies] = useRecoilState<any>(actorMoviesState);

  // const ActorInfo = useRecoilValue(ActorInfoState);

  // // クリックされた内容をmovieInformationに格納
  // const movieRes = actorMovies.filter((value: any) => {
  //   return value.id === movieDetailId && value.media_type === "movie";
  // });
  // // ||value.hasOwnProperty("media_type");

  // // && typeof value.media_type === "undefined"
  // // (value.id === movieDetailId && value.media_type === "movie") ||
  // // クリックされた内容をtvInformationに格納
  // const tvRes = actorMovies.filter((value: any) => {
  //   return value.id === movieDetailId && value.media_type === "tv";
  // });

  // const movieInformation = movieRes[0];
  // const tvInformation = tvRes[0];

  // console.log(movieRes);
  // // 　movie 情報 cast 情報を格納
  // useEffect(() => {
  //   let ignore = false;

  //   async function fetchData() {
  //     if (!ignore && movieInformation) {
  //       const movieUrl = `https://api.themoviedb.org/3/movie/${movieInformation.id}/videos?api_key=${API_KEY}`;
  //       const CastUrl = `https://api.themoviedb.org/3/movie/${movieInformation.id}/credits?api_key=${API_KEY}`;
  //       const request = await axios
  //         .get(movieUrl)
  //         .then((response) => {
  //           setMovieVideo(response.data.results);
  //           // cast　情報をmovieCast に格納
  //           async function fetchMovieData() {
  //             const request = await axios
  //               .get(CastUrl)
  //               .then((response) => {
  //                 setMovieCast(response.data.cast);
  //               })
  //               .then((error) => {
  //                 console.error(error);
  //               });

  //             return request;
  //           }
  //           fetchMovieData();
  //         })
  //         .then((error) => {
  //           console.error(error);
  //         });

  //       return request;
  //     }
  //   }
  //   fetchData();
  //   return () => {
  //     let ignore = true;
  //   };
  // }, [movieInformation]);

  // // Tv 情報 cast 情報を格納
  // useEffect(() => {
  //   let ignoreTv = false;
  //   const fetchData = async () => {
  //     if (!ignoreTv && tvInformation) {
  //       const tvUrl = `https://api.themoviedb.org/3/tv/${tvInformation.id}/videos?api_key=${API_KEY}`;
  //       const CastUrl = `https://api.themoviedb.org/3/tv/${tvInformation.id}/credits?api_key=${API_KEY}`;
  //       const request = await axios
  //         .get(tvUrl)
  //         .then((response) => {
  //           setMovieVideo(response.data.results);
  //           // cast　情報をtvCast に格納
  //           async function fetchMovieData() {
  //             const request = await axios
  //               .get(CastUrl)
  //               .then((response) => {
  //                 setMovieCast(response.data.cast);
  //                 console.log(movieCast);
  //               })
  //               .then((error) => {
  //                 console.error(error);
  //               });

  //             return request;
  //           }
  //           fetchMovieData();
  //         })
  //         .then((error) => {
  //           console.error(error);
  //         });

  //       return request;
  //     }
  //   };
  //   fetchData();
  //   return () => {
  //     let ignoreTv = true;
  //   };
  // }, [tvInformation]);

  // // トレイラー動画だけtrailerMovieに格納
  // useEffect(() => {
  //   {
  //     const trailerMovies = movieVideo.filter((value: any) => {
  //       return value.type === "Trailer";
  //     });

  //     setTrailerMovie(trailerMovies);
  //   }
  // }, [movieVideo]);

  return (
    <>
      <Link href="/movie">ホーム</Link>
      {/* <h2>
        {movieInformation ? movieInformation.title : tvInformation.title}
        <span>{movieInformation.release_date}</span>
      </h2>
      <p>
        {movieInformation.overview
          ? movieInformation.overview
          : tvInformation.overview}
      </p> */}
      {trailerMovie.map((value: any) => {
        return (
          <>
            <ul>
              <li>
                <iframe
                  id="inline-frame"
                  width="40%"
                  style={{ border: "none" }}
                  src={`https://www.youtube.com/embed/${value.key}`}
                ></iframe>
              </li>
            </ul>
          </>
        );
      })}

      {/* <p>{overview}</p> */}
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
                    <img src={`${requests.image}${cast.profile_path}`} />
                    <ImageListItemBar
                      title={cast.name}
                      subtitle={cast.author}
                      actionIcon={
                        <IconButton
                          sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                          aria-label={`info about ${cast.title}`}
                        >
                          <InfoIcon />
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
