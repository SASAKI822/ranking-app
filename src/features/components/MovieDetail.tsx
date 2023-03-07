import { API_KEY, requests } from "@/lib/MovieApi";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { TabContext, TabList } from "@mui/lab";
import TabPanel from "@mui/lab/TabPanel";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { RegisterActorListState, uIdState } from "@/lib/atom";
type Actor = {
  id: string;
  name: string;
  img: string;
  profile_path: string;
};

const MovieDetail = () => {
  //  映画出演俳優
  const [movieCast, setMovieCast] = useState<any>([]);

  // tv情報
  const [movieVideo, setMovieVideo] = useState<any>([]);

  // 映画のビデオ
  const [trailerMovie, setTrailerMovie] = useState<any>([]);

  // ユーザーid
  const [userId, setUserId] = useRecoilState(uIdState);

  // ビデオタブ
  const [value, setValue] = useState("0");

  // 登録俳優リスト
  const [registerActorList, setRegisterActorList] = useRecoilState(
    RegisterActorListState
  );
  // ルーター string 型から number 型へ変換
  const router = useRouter();
  const title = router.query.title;
  const posterPath = router.query.posterPath;
  const overview = router.query.overview;
  const releaseDate = router.query.releaseDate;
  const movieOrTvDetailIdString = router.query.id as string;
  const movieOrTvDetailId = parseInt(movieOrTvDetailIdString);
  const movieDetailMediaType = router.query.mediaType;

  // メディアタイプによって格納先分ける　movie or tv
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
          const movieUrl = `https://api.themoviedb.org/3/movie/${movieOrTvDetailId}/videos?api_key=${API_KEY}&language=ja`;
          const CastUrl = `https://api.themoviedb.org/3/movie/${movieOrTvDetailId}/credits?api_key=${API_KEY}&language=ja`;

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
      // テレビ
    } else if (movieDetailMediaType === "tv") {
      let ignoreTv = false;
      const fetchData = async () => {
        if (!ignoreTv) {
          const tvUrl = `https://api.themoviedb.org/3/tv/${movieOrTvDetailId}/videos?api_key=${API_KEY}&language=ja`;
          const CastUrl = `https://api.themoviedb.org/3/tv/${movieOrTvDetailId}/aggregate_credits?api_key=${API_KEY}&language=ja`;

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
      const trailerMovies: string[] = movieVideo.filter((value: any) => {
        return value.type === "Trailer";
      });
      setTrailerMovie(trailerMovies);
    }
  }, [movieVideo]);

  // ビデオタブ
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // 俳優情報を登録する処理
  const handleAddActor = async (
    e: React.MouseEvent<HTMLInputElement>,
    actor: Actor
  ) => {
    e.preventDefault();

    // 俳優重複フィルター
    const containActor = registerActorList.find(
      (registerActor: any) => registerActor.id === actor.id
    );

    // 登録されていなければ登録
    if (!containActor) {
      const collectionPath = collection(db, "users", userId, "actors");
      // Firestoreに登録
      addDoc(collectionPath, {
        id: actor.id,
        name: actor.name,
        profilePath: actor.profile_path,
      }).then(() => {
        // 登録した俳優情報をstateに追加
        setRegisterActorList([...registerActorList, actor]);
      });
    }
    // 登録されていればアラート
    else {
      window.alert("すでに追加されています。");
    }
  };

  return (
    <>
      <div style={{ marginBottom: "40px", padding: "20px" }}>
        <div style={{ display: "flex", padding: "5px" }}>
          <div style={{ marginBottom: "10px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${requests.IMAGE}/${posterPath}`} alt="movie image" />
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
                    {trailerMovie.map((movie: any, index: number) => (
                      <Tab
                        key={index}
                        label={`${index}`}
                        style={{ color: "white" }}
                        value={index.toString()}
                      />
                    ))}
                  </TabList>
                  {trailerMovie.map((movie: any, index: number) => (
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
                <ImageListItem
                  key={cast.img}
                  sx={{ maxWidth: "185px", placeSelf: "center" }}
                >
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
                      src={`${requests.IMAGE}${cast.profile_path}`}
                      alt="actor image"
                    />
                    <ImageListItemBar
                      sx={{
                        letterSpacing: "1px",
                        background: "rgba(0, 0, 0, 0.7);",
                        fontFamily: "Raleway",
                        "&.MuiImageListItemBar-titleWrap ": {
                          padding: "15px 16px",
                        },

                        "&.MuiImageListItemBar-subtitle": {
                          letterSpacing: "1px",
                        },
                      }}
                      title={cast.name}
                      subtitle={cast.character}
                      actionIcon={
                        <IconButton
                          sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                          aria-label={`info about ${cast.title}`}
                          onClick={(e: any) => {
                            handleAddActor(e, cast);
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
