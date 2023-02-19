import Header from "@/components/layouts/Header";
import SidebarNav from "@/components/layouts/Sidebar";
import MovieList from "@/features/components/MovieList";
import WatchedList from "@/features/components/WatchedList";
import { WatchedListState, WatchListState } from "@/lib/atom";
import { requests } from "@/lib/MovieApi";
import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

// 見たことある映画リスト
const watchedList = () => {
  const [watchedList, setWatchedList] = useRecoilState(WatchListState);
  const [watchList, setWatchList] = useRecoilState(WatchListState); // 削除機能
  const handleWatchDelete = (e: any, targetMovie: any) => {
    e.preventDefault();
    setWatchList((current: any) =>
      current.filter((value: any) => targetMovie !== value)
    );
    setWatchedList((a: any) => {
      return [...a, targetMovie];
    });
  };

  //  <button onClick={(e) => handleDelete(e, movie)}>削除</button>

  return (
    <>
      <Grid container direction="row" sx={{ width: "100%" }}>
        <Grid
          item
          sx={{
            background: "#0f0f0f",
            position: "fixed",
            width: "100%",
            zIndex: "1",
          }}
          xs={12}
        >
          <Header />
        </Grid>
        <Grid item sx={{ width: "100%" }} md={2}>
          <SidebarNav />
        </Grid>
        <Grid item sx={{ width: "100%", marginTop: "70px" }} md={10}>
          <Grid>見た映画リスト</Grid>
          <ImageList
            gap={8}
            sx={{
              mb: 8,
              gridTemplateColumns:
                "repeat(auto-fill, minmax(180px, 1fr))!important",
            }}
          >
            {watchList &&
              watchList.length > 0 &&
              watchList.map((movie: any) => {
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
                            // onClick={() => }
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
        </Grid>
      </Grid>
    </>
  );
};

export default watchedList;
