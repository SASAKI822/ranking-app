import { API_KEY, requests } from "@/lib/MovieApi";
import axios from "axios";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ActorInfoState, MovieInfoState } from "@/lib/atom";
import MovieList from "./MovieList";

const ActorDetail = () => {
  const [actorCareer, setActorCareer] = useState<any>([]);
  // ルーター
  const router = useRouter();
  const personId: any = router.query.id;
  const actorName: any = router.query.name;

  const setActorInfo = useSetRecoilState(ActorInfoState);

  const [actorMovies, setActorMovies] = useRecoilState(MovieInfoState);

  // atom 参照
  // const { id } = useRecoilValue(ActorInfoState);
  // const { name } = useRecoilValue(ActorInfoState);

  // personId と 俳優名を代入

  const actorInfoUrl = `https://api.themoviedb.org/3/person/${personId}?api_key=${API_KEY}`;
  const actorUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_people=${personId}`;

  //俳優出演映画をactorMovie に格納
  useEffect(() => {
    async function fetchData() {
      const request = await axios
        .get(actorUrl)
        .then((response) => {
          setActorMovies(response.data.results);
        })
        .catch((error) => {
          console.error(error);
        });

      return request;
    }
    fetchData();
  }, [actorUrl]);
  console.log(actorMovies);
  useEffect(() => {
    async function fetchActorData() {
      const request = await axios.get(actorInfoUrl).then((response) => {
        setActorCareer(response.data);
      });

      return request;
    }
    fetchActorData();
  }, [actorInfoUrl]);
  console.log(actorMovies);
  return (
    <>
      {/* <h2>{name}の出演映画</h2> */}
      <p>birthday:{actorCareer.birthday}</p>;
      <MovieList Movies={actorMovies} />
    </>
  );
};

export default ActorDetail;
