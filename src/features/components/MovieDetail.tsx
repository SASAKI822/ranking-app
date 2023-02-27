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

const MovieDetail = () => {
  const [movieCast, setMovieCast] = useState<any>([]);
  const [movieVideo, setMovieVideo] = useState<any>([]);
  const [trailerMovie, setTrailerMovie] = useState<any>([]);
  const [userId, setUserId] = useRecoilState(uIdState);
  const [value, setValue] = useState<string>("0");
  const [registerActorList, setRegisterActorList] = useRecoilState(
    RegisterActorListState
  );
  // ルーター string 型から number 型へ変換
  const router = useRouter();
  const title: string | string[] | undefined = router.query.title;
  const posterPath: string | string[] | undefined = router.query.posterPath;
  const overview: string | string[] | undefined = router.query.overview;
  const releaseDate: string | string[] | undefined = router.query.releaseDate;
  const movieOrTvDetailIdString = router.query.id as string;
  const movieOrTvDetailId = parseInt(movieOrTvDetailIdString);
  const movieDetailMediaType: string | string[] | undefined =
    router.query.mediaType;

  // メディアタイプによって格納先分ける　movie or tv
  useEffect(() => {
    // Tv 情報 cast 情報を格納
    if (
      movieDetailMediaType === "movie" ||
      movieDetailMediaType === null ||
      movieDetailMediaType === undefined ||
      movieDetailMediaType === ""
    ) {
      let ignore: boolean = false;

      const fetchData = async () => {
        if (!ignore) {
          const movieUrl: string = `https://api.themoviedb.org/3/movie/${movieOrTvDetailId}/videos?api_key=${API_KEY}&language=ja`;
          const CastUrl: string = `https://api.themoviedb.org/3/movie/${movieOrTvDetailId}/credits?api_key=${API_KEY}&language=ja`;

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
      let ignoreTv: boolean = false;
      const fetchData = async () => {
        if (!ignoreTv) {
          const tvUrl: string = `https://api.themoviedb.org/3/tv/${movieOrTvDetailId}/videos?api_key=${API_KEY}&language=ja`;
          const CastUrl: string = `https://api.themoviedb.org/3/tv/${movieOrTvDetailId}/aggregate_credits?api_key=${API_KEY}&language=ja`;

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

  // 俳優を登録
  const handleAddActor = async (
    e: React.MouseEvent<HTMLInputElement>,
    actor: any
  ) => {
    e.preventDefault();

    // 俳優重複フィルター
    const contain = registerActorList.filter((value: any) => {
      return value.id === actor.id;
    });
    if (contain.length === 0) {
      const collectionPath = collection(db, "users", userId, "actors");
      const q = query(collectionPath);
      setRegisterActorList([actor]);
      await getDocs(q).then((querySnapshot) => {
        const actorsDocumentRef = addDoc(collectionPath, {
          id: actor.id,
          name: actor.name,
          profilePath: actor.profile_path,
        });
      });
    } else {
      window.alert("すでに追加されています。");
    }
  };

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
                      src={`${requests.image}${cast.profile_path}`}
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
