import * as React from "react";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { WatchedListState } from "../../lib/atom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import { requests } from "@/lib/MovieApi";
import { confirmAlert } from "react-confirm-alert";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import "react-confirm-alert/src/react-confirm-alert.css";
import { WatchList } from "./WatchList";

// Header コンポーネント

const WatchedList = () => {
  const [watchedList, setWatchedList] = useRecoilState(WatchedListState);

  // watchedList表示
  useEffect(() => {
    async function fetchData() {
      const watchedMovieRef = query(
        collection(db, "users", "3afv8SDIvjimSBLiXZsM", "watchedMovie")
      );

      getDocs(watchedMovieRef).then((querySnapshot) => {
        setWatchedList(querySnapshot.docs.map((doc) => ({ ...doc.data() })));
      });
    }

    fetchData();
  }, [setWatchedList, watchedList]);

  // 削除機能
  const handleWatchedDelete = (
    e: React.MouseEvent<HTMLElement>,
    targetMovie: WatchList
  ) => {
    const usersId = collection(db, "users");

    const moviesRef = collection(
      db,
      "users",
      "3afv8SDIvjimSBLiXZsM",
      "watchedMovie"
    );
    const q = query(moviesRef, where("id", "==", targetMovie.id));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.docs.map((document) => {
        const movieDocument = doc(
          db,
          "users",
          "3afv8SDIvjimSBLiXZsM",
          "watchedMovie",
          document.id
        );
        deleteDoc(movieDocument);
      });
    });
  };

  const submit = (movie: WatchList) => {
    confirmAlert({
      title: "本当に消しますか？",

      buttons: [
        {
          label: "Yes",
          onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            handleWatchedDelete(e, movie),
        },
        {
          label: "No",
        },
      ],
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
        {watchedList &&
          watchedList.length > 0 &&
          watchedList.map((movie: WatchList) => {
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
                      mediaType: movie.mediaType,
                      overview: movie.overview,
                      releaseDate: movie.releaseDate,
                      video: movie.video,
                      posterPath: movie.posterPath,
                    },
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${requests.image}${movie.posterPath}`}
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
                    title={movie.title ? movie.title : movie.title}
                    // subtitle={movie.name}
                    actionIcon={
                      <IconButton
                        sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                        aria-label={`info about ${movie.title}`}
                        onClick={(e: React.MouseEvent<HTMLElement>) => {
                          submit(movie);
                          e.preventDefault();
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
export default WatchedList;
