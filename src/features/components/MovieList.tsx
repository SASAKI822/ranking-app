import * as React from "react";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useSetRecoilState } from "recoil";
import { searchMovieResultState, WatchListState } from "../../lib/atom";
import { useRecoilValue } from "recoil";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { requests } from "@/lib/MovieApi";
import { Box, useMediaQuery } from "@mui/material";

type MoviesProps = {
  Movies: string;
};

// Header コンポーネント

const MovieList = ({ Movies, fetchUrl, onClick }: any) => {
  // Input入力値をKeyword に入れる

  const setWatchList = useSetRecoilState(WatchListState);

  const matchesSixthCols = useMediaQuery("(min-width:1424px)");
  const matchesFifthCols = useMediaQuery("(min-width:1300px)");
  const matchesThreeResCols = useMediaQuery("(min-width:900px)");
  const matchesFourCols = useMediaQuery("(min-width:1024px)");
  const matchesThreeCols = useMediaQuery("(min-width:580px)");
  const matchesTwoCols = useMediaQuery("(min-width:375px)");
  const matchesOneCols = useMediaQuery("(min-width:320px)");
  const handleFilterPopularDescMovie = (e: any) => {
    e.preventDefault();

    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setWatchList(request.data.results);
      return request;
    }
    fetchData();
  };

  // 最近の映画
  const handleReleaseDateDescMovie = (e: any) => {
    e.preventDefault();

    async function fetchData() {
      const request = await axios.get(
        fetchUrl + requests.filter.releaseDateDesc
      );
      setWatchList(request.data.results);
      return request;
    }
    fetchData();
  };

  //評価が高い順
  const handleVoteAverageDescMovie = (e: any) => {
    e.preventDefault();

    async function fetchData() {
      const request = await axios.get(
        fetchUrl + requests.filter.voteAverageDesc
      );
      console.log(fetchUrl + requests.filter.voteAverageDesc);
      setWatchList(request.data.results);
      return request;
    }
    fetchData();
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
                      video: movie.video,
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
                        onClick={(e: any) => {
                          e.preventDefault();
                          setWatchList((a: any) => {
                            return [...a, movie];
                          });
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
