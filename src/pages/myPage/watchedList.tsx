import MovieList from "@/features/components/MovieList";
import { WatchedListState } from "@/lib/atom";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

// 見たことある映画リスト
const watchedList = () => {
  const watchedMoviesList: any = useRecoilValue(WatchedListState);
  const setWatchedMoviesList: any = useSetRecoilState(WatchedListState);
  const handleDelete = (e: any, targetMovie: any) => {
    e.preventDefault();
    setWatchedMoviesList((current: any) =>
      current.filter((value: any) => targetMovie !== value)
    );
  };
  //  <button onClick={(e) => handleDelete(e, movie)}>削除</button>

  return (
    <>
      <MovieList Movies={watchedMoviesList} />
    </>
  );
};

export default watchedList;
