import * as React from "react";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { WatchListState } from "../../lib/atom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import { requests } from "@/lib/MovieApi";
import { db } from "@/lib/firebase";
import { addDoc, collection, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

type MoviesProps = {
  Movies: string[];
};

type typeMovies = {
  id: string;
  title: string;
};

// Header コンポーネント

const MovieList = ({ Movies }: MoviesProps) => {
  // Input入力値をKeyword に入れる

  const [watchList, setWatchList] = useRecoilState(WatchListState);

  const handleAddWatch = async (e: any, movie: any) => {
    const collectionPath = collection(
      db,
      "users",
      "3afv8SDIvjimSBLiXZsM",
      "movies"
    );
    const moviesDocumentRef = await addDoc(collectionPath, {
      id: movie.id,
      title: movie.title,
      mediaType: movie.media_type ? movie.media_type : "",
      releaseDate: movie.release_date ? movie.release_date : "",
      video: movie.video,
      overview: movie.overview,
      posterPath: movie.poster_path,
    });

    e.preventDefault();
    setWatchList((a) => {
      return [...a, movie];
    });
  };
  return (
    <>
      <ImageList
        gap={8}
        sx={{
          mb: 8,
          gridTemplateColumns:
            "repeat(auto-fill, minmax(180px, 1fr))!important",
        }}
      >
        {Movies &&
          Movies.length > 0 &&
          Movies.map((movie: any) => {
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
                    src={`${requests.image}${movie.poster_path}`}
                    alt="movie image"
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
                    title={movie.title ? movie.title : movie.name}
                    // subtitle={movie.name}
                    actionIcon={
                      <IconButton
                        sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                        aria-label={`info about ${movie.title}`}
                        // 見た映画登録ボタン
                        onClick={(
                          e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                        ) => {
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
