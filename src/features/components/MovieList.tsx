import * as React from "react";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useSetRecoilState } from "recoil";
import { WatchListState } from "../../lib/atom";
import { useRecoilValue } from "recoil";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { requests } from "@/lib/MovieApi";

type MoviesProps = {
  Movies: string;
};

// Header コンポーネント

const MovieList = ({ Movies }: MoviesProps) => {
  // Input入力値をKeyword に入れる

  const setWatchList = useSetRecoilState(WatchListState);

  return (
    <>
      <ImageList
        gap={8}
        cols={4}
        sx={{
          gridTemplateColumns:
            "repeat(auto-fill, minmax(200px, 1fr) 1fr!important",
        }}
      >
        {Movies &&
          Movies.length > 0 &&
          Movies.map((movie: any) => {
            return (
              <>
                <div key={movie.id}>
                  <ImageListItem key={movie.img}>
                    <Link
                      href={{
                        pathname: `/movie/${movie.id}`,
                        query: {
                          id: movie.id,
                          title: movie.title,
                          overview: movie.overview,
                          releaseDate: movie.release_date,
                          video: movie.video,
                        },
                      }}
                    >
                      <img
                        src={`${requests.image}${movie.poster_path}`}
                        alt=""
                      />

                      <ImageListItemBar
                        title={movie.title ? movie.title : movie.name}
                        // subtitle={movie.name}
                        actionIcon={
                          <IconButton
                            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                            aria-label={`info about ${movie.title}`}
                            // 見た映画登録ボタン
                            onClick={(e: any) => {
                              e.preventDefault();
                              setWatchList((a: any) => {
                                return [...a, movie];
                              });
                            }}
                          >
                            <InfoIcon />
                          </IconButton>
                        }
                      />
                    </Link>
                  </ImageListItem>
                </div>
              </>
            );
          })}
      </ImageList>
    </>
  );
};
export default MovieList;
