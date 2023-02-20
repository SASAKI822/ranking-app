import MovieGenre from "@/features/components/MovieGenre";
import { WatchListState } from "@/lib/atom";
import { API_KEY, requests } from "@/lib/MovieApi";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";

import { useRouter } from "next/router";

import MovieGenreDetail from "@/features/components/MovieGenreDetail";

const TopRatedId = () => {
  const router = useRouter();
  const Id: any = router.query.id;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-us`;
  console.log(Id);

  return (
    <>
      <MovieGenreDetail pageId={Id} fetchUrl={url} GenreName="TopRated" />
    </>
  );
};

export default TopRatedId;
