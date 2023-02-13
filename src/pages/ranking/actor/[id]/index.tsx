import { API_KEY, requests } from "@/lib/MovieApi";
import axios from "axios";
import { query } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const actorDetail = () => {
  const [actorMovies, setActorMovies] = useState<any>([]);
  const router = useRouter();
  const personId = router.query.id;
  const personTitle = router.query.name;

  const castUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_people=${personId}`;
  const movieUrl = `${requests.search}`;
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(castUrl);
      setActorMovies(request.data.results);
      return request;
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function MovieData() {
      const request = await axios.get(movieUrl).then((response) => {});
      return request;
    }
    MovieData();
  });
  console.log(actorMovies);
  return (
    <>
      <h2>{personTitle}の出演映画</h2>
      {actorMovies.map((actorMovie: any) => (
        <>
          <Link
            href={{
              pathname: "/ranking/movie",
              query: { id: personId, mvId: actorMovie.id },
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

export default actorDetail;
