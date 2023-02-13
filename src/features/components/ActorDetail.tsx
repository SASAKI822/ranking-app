import { API_KEY, requests } from "@/lib/MovieApi";
import axios from "axios";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ActorInfoState } from "@/lib/atom";
const ActorDetail = () => {
  const [actorMovies, setActorMovies] = useState<any>([]);

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

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(actorUrl);
      setActorMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [actorUrl]);

  console.log(name);
  return (
    <>
      <h2>{name}の出演映画</h2>
      {actorMovies.map((actorMovie: any) => (
        <>
          <Link
            href={{
              pathname: "/movie/[id]",
              query: {
                id: actorMovie.id,
                title: actorMovie.title,
                overview: actorMovie.overview,
                releaseDate: actorMovie.release_date,
              },
            }}
          >
            <p>{actorMovie.title}</p>
            <img src={`${requests.image}${actorMovie.poster_path}`} alt="" />
          </Link>
        </>
      ))}
    </>
  );
};

export default ActorDetail;
