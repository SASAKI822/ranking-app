import { API_KEY, requests } from "@/lib/MovieApi";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { MovieInfoState } from "@/lib/atom";
import MovieList from "./MovieList";

interface TypeActorCareer {
  profile_path: string;
  birthday: string;
  place_of_birth: string;
  biography: string;
}

const ActorDetail = () => {
  // 俳優情報
  const [actorCareer, setActorCareer] = useState<TypeActorCareer>({
    profile_path: "",
    birthday: "",
    place_of_birth: "",
    biography: "",
  });

  // 俳優出演映画
  const [actorMovies, setActorMovies] = useRecoilState(MovieInfoState);

  // ルーター
  const router = useRouter();
  const personId = router.query.id;
  const actorName = router.query.name;

  //俳優情報をactorCareer に格納
  const actorInfoUrl = `https://api.themoviedb.org/3/person/${personId}?api_key=${API_KEY}&language=ja`;
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
    }
    fetchData();
  }, [actorInfoUrl]);

  //俳優出演映画をactorMovie に格納

  const actorMovieUrl = `https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${API_KEY}&language=ja`;
  useEffect(() => {
    async function fetchActorData() {
      const request = await axios.get(actorMovieUrl).then((response) => {
        setActorMovies(response.data.cast);
      });

      return request;
    }
    fetchActorData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actorMovieUrl]);

  return (
    <>
      <div style={{ marginBottom: "40px", padding: "20px" }}>
        <div style={{ display: "flex", padding: "5px" }}>
          <div style={{ marginBottom: "10px" }}>
            <img src={`${requests.IMAGE}${actorCareer.profile_path}`} />
          </div>
          <div style={{ width: "100%", margin: "20px" }}>
            <h1 style={{ marginBottom: "20px" }}>{actorName}</h1>
            <p>誕生：{actorCareer.birthday}</p>
            <p>出生地：{actorCareer.place_of_birth}</p>
          </div>
        </div>
        <p>{actorCareer.biography}</p>
      </div>
      <MovieList movies={actorMovies} />
    </>
  );
};

export default ActorDetail;
