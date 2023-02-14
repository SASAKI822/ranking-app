import MovieList from "@/features/components/MovieList";
import { WatchListState } from "@/lib/atom";
import { API_KEY, requests } from "@/lib/MovieApi";

import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

// 見る映画リスト
const watchList = () => {
  const watchMoviesList: any = useRecoilValue(WatchListState);
  const setWatchMoviesList: any = useSetRecoilState(WatchListState);
  const copyWatchMoviesList: any = [...watchMoviesList];
  console.log(copyWatchMoviesList);

  // 削除機能
  const handleDelete = (e: any, targetMovie: any) => {
    e.preventDefault();
    setWatchMoviesList((current: any) =>
      current.filter((value: any) => targetMovie !== value)
    );
  };
  return (
    <>
      <MovieList Movies={watchMoviesList} />
    </>
  );
};

export default watchList;
