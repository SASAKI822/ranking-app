import { API_KEY, requests } from "@/lib/MovieApi";
import axios from "axios";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ActorInfoState } from "@/lib/atom";
import MovieList from "./MovieList";
const ActorDetail = () => {
  const [actorMovies, setActorMovies] = useState<any>([]);
  // ルーター
  const router = useRouter();
  const personId: any = router.query.id;
  const actorName: any = router.query.name;

  const setActorInfo = useSetRecoilState(ActorInfoState);

  // atom 参照
  const { id } = useRecoilValue(ActorInfoState);
  const { name } = useRecoilValue(ActorInfoState);

  // personId と 俳優名を代入
  useEffect(() => {
    setActorInfo({ id: personId, name: actorName });
  }, [personId, actorName]);

  const actorUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_people=${id}`;

  //俳優出演映画をactorMovie に格納
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(actorUrl);
      setActorMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [actorUrl]);

  return (
    <>
      <h2>{name}の出演映画</h2>
      <MovieList Movies={actorMovies} />
    </>
  );
};

export default ActorDetail;
