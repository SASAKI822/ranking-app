import * as React from "react";
import Link from "next/link";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import { requests } from "@/lib/MovieApi";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { Movie } from "./MovieGenre";
import { InfoType } from "@/lib/atom";

type MoviesProps = {
  // 小文字始まりに変更
  // 使用する型に合わせて変更
  movies: InfoType[];
};

type typeMovies = {
  id: string;
  title: string;
};

// JSXを用いるコンポーネントの場合は大文字で始める
// Header コンポーネント
const MovieList = ({ movies }: MoviesProps) => {
  // Input入力値をKeyword に入れる

  const handleAddWatch = async (
    e: React.MouseEvent<HTMLInputElement>,
    movie: Movie
  ) => {
    e.preventDefault();
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
                    src={`${requests.image}${movie.poster_path}`}
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
