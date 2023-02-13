import { API_KEY, requests } from "@/lib/MovieApi";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const MovieActor = () => {
  const [cast, setCast] = useState<any>([]);
  const router = useRouter();
  const movieId = router.query.id;
  const movieTitle = router.query.title;
  const mvId = router.query.mvId;
  const actorUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`;
  console.log(actorUrl);
  useEffect(() => {
    async function Data() {
      const request = await axios.get(actorUrl).then((res) => {
        const cast = res.data.cast;
        setCast(cast);
      });
      return request;
    }
    Data();
  }, [actorUrl]);
  console.log(cast);
  return (
    <>
      <h2>{movieTitle}</h2>
      <ul>
        {cast.map((value: any) => (
          <>
            <Link
              href={{
                pathname: `/ranking/actor/${value.id}`,
                query: { id: value.id, name: value.name },
              }}
            >
              <li key={value.id}>
                <img src={`${requests.image}${value.profile_path}`} alt="" />
                <p>{value.name}</p>
              </li>
            </Link>
          </>
        ))}
      </ul>
    </>
  );
};

export default MovieActor;
