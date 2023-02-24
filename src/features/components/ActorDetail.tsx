import { API_KEY, requests } from "@/lib/MovieApi";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ActorInfoState, MovieInfoState } from "@/lib/atom";
import MovieList from "./MovieList";

type typeActorCareer = {
  profile_path: string;
  birthday: string;
  place_of_birth: string;
  biography: string;
};

const ActorDetail = () => {
  const [actorCareer, setActorCareer] = useState<typeActorCareer[]>([]);
  // ルーター
  const router = useRouter();
  const personId: string | string[] | undefined = router.query.id;
  const actorName: string | string[] | undefined = router.query.name;

  const setActorInfo = useSetRecoilState(ActorInfoState);

  const [actorMovies, setActorMovies] = useRecoilState(MovieInfoState);

  // atom 参照
  // const { id } = useRecoilValue(ActorInfoState);
  // const { name } = useRecoilValue(ActorInfoState);

  // personId と 俳優名を代入

  const actorInfoUrl: string = `https://api.themoviedb.org/3/person/${personId}?api_key=${API_KEY}`;
  const actorMovieUrl: string = `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${API_KEY}`;

  //俳優出演映画をactorMovie に格納
  useEffect(() => {
    async function fetchData() {
      const request = await axios
        .get(actorInfoUrl)
        .then((response) => {
          setActorCareer(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

      return request;
    }
    fetchData();
  }, [actorInfoUrl]);

  useEffect(() => {
    async function fetchActorData() {
      const request = await axios.get(actorMovieUrl).then((response) => {
        setActorMovies(response.data.cast);
      });

      return request;
    }
    fetchActorData();
  }, [actorMovieUrl]);

  return (
    <>
      <div style={{ marginBottom: "40px", padding: "20px" }}>
        <div style={{ display: "flex", padding: "5px" }}>
          <div style={{ marginBottom: "10px" }}>
            <img src={`${requests.image}${actorCareer.profile_path}`} />
          </div>
          <div style={{ width: "100%", margin: "20px" }}>
            <h1 style={{ marginBottom: "20px" }}>{actorName}</h1>
            <p>誕生：{actorCareer.birthday}</p>
            <p>出生地：{actorCareer.place_of_birth}</p>
          </div>
        </div>
        <p>{actorCareer.biography}</p>
      </div>
      <MovieList Movies={actorMovies} />
    </>
  );
};

export default ActorDetail;
