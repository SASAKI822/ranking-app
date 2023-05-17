import Link from "next/link";
import axios from "axios";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import { API_KEY, requests } from "@/lib/MovieApi";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { Movie } from "./MovieGenre";
import { InfoType, uIdState, WatchListState } from "@/lib/atom";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";

type MoviesProps = {
  movies: InfoType[];
};

// Header コンポーネント

const MovieList = ({ movies }: MoviesProps) => {
  // ユーザーid
  const [userId, setUserId] = useRecoilState(uIdState);
  // 映画リスト
  const [watchList, setWatchList] = useRecoilState(WatchListState);
  const [company, setCompany] = useState();
  useEffect(() => {
    const companyUrl = `https://api.themoviedb.org/3/search/company?api_key=${API_KEY}&query=京アニ
    `;
    async function fetchData() {
      const request = await axios.get(companyUrl);
      setCompany(request.data);
    }
    fetchData();
  }, []);
  console.log(company);
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

  return (
    <>
      <ImageList
        gap={10}
        sx={{
          mb: 8,
          gridTemplateColumns:
            "repeat(auto-fill, minmax(180px, 1fr))!important",
        }}
      >
        {movies &&
          movies.length > 0 &&
          movies.map((movie: any) => {
            return (
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
                      mediaType: movie.media_type,
                      overview: movie.overview,
                      releaseDate: movie.release_date,
                      posterPath: movie.poster_path,
                    },
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${requests.IMAGE}${movie.poster_path}`}
                    alt="movie image"
                    style={{ backgroundColor: "#dbdbdb" }}
                  />
                  <ImageListItemBar
                    sx={{
                      background: "rgba(0, 0, 0, 0.7);",
                      "& .MuiImageListItemBar-title": {
                        textAlign: "start",
                        overflow: "auto",
                        whiteSpace: "normal",
                      },
                      "& .MuiImageListItemBar-positionBottom ": {
                        background: "rgba(255, 255, 255, 0.94)",
                      },
                    }}
                    title={movie.title ? movie.title : movie.name}
                    // subtitle={movie.name}
                    actionIcon={
                      <IconButton
                        sx={{
                          color: "rgba(255, 255, 255, 0.54)",
                          height: "30px",
                        }}
                        aria-label={`info about ${movie.title}`}
                        // 見た映画登録ボタン
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
            );
          })}
      </ImageList>
    </>
  );
};
export default MovieList;
