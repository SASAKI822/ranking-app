import { WatchListState } from "@/lib/atom";
import { API_KEY, requests } from "@/lib/MovieApi";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";

// 見たことある映画リスト
const watchedList = () => {
  const watchedMoviesList: any = useRecoilValue(WatchListState);

  console.log(watchedMoviesList);
  return (
    <>
      <ul>
        <Link href="/movie">ホーム</Link>
        {watchedMoviesList.map((movie: any) => (
          <>
            <li key={movie.id}>
              <span>{movie.title}</span>
              <Link
                href={{
                  pathname: `/ranking/actor`,
                  query: { id: movie.id, title: movie.name },
                }}
              >
                <img src={`${requests.image}${movie.poster_path}`} alt="" />
              </Link>
            </li>
          </>
        ))}
      </ul>
    </>
  );
};

export default watchedList;
