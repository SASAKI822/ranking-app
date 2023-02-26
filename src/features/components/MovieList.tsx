import * as React from "react";
import Link from "next/link";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import { requests } from "@/lib/MovieApi";
import { db } from "@/lib/firebase";
import {
  addDoc,
  deleteDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Movie } from "./MovieGenre";
import { InfoType, uIdState } from "@/lib/atom";
import { useRecoilState } from "recoil";

type MoviesProps = {
  movies: InfoType[];
};

type typeMovies = {
  id: string;
  title: string;
};

// Header コンポーネント

const MovieList = ({ movies }: MoviesProps) => {
  // Input入力値をKeyword に入れる
  const [userId, setUserId] = useRecoilState(uIdState);

  const handleAddWatch = async (
    e: React.MouseEvent<HTMLInputElement>,
    movie: Movie
  ) => {
    e.preventDefault();
    const collectionPath = collection(db, "users", userId, "movies");
    const moviesDocumentRef = await addDoc(collectionPath, {
      id: movie.id,
      title: movie.title ? movie.title : "",
      mediaType: movie.media_type ? movie.media_type : "",
      releaseDate: movie.release_date ? movie.release_date : "",
      video: movie.video ? movie.video : "",
      overview: movie.overview ? movie.overview : "",
      posterPath: movie.poster_path ? movie.poster_path : "",
    });
    // 削除機能
    const q = query(collectionPath, where("id", "==", movie.id));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.docs.map((document) => {
        const movieDocument = doc(db, "users", userId, "movies", document.id);
        console.log(movieDocument);
        deleteDoc(movieDocument);
      });
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
