import { API_KEY, requests } from "@/lib/MovieApi";
import axios from "axios";

import { useEffect, useState } from "react";

type ActorProps = {
  actorUrl: string;
};
const ActorList: any = ({ actorUrl }: ActorProps) => {
  const [movies, setMovies] = useState<any>([]);
  const [detailActors, setDetailActors] = useState<any>([]);
  const [actorContent, setActorContent] = useState<any>([]);

  useEffect(() => {
    async function fetchActorData() {
      const request: any = await axios.get(actorUrl);
      setMovies(request.data.results);

      return request;
    }

    fetchActorData();
  }, [actorUrl]);

  useEffect(() => {
    {
      movies.map((movie: any) => {
        const movieID = movie.id;
        const actorUrl = `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${API_KEY}`;
        const castRequest: any = axios.get(actorUrl).then((response) => {
          setDetailActors(response.data.cast);
          //console.log(response.data.cast);
          setActorContent((prevState: any) => [
            ...prevState,
            { movie, cast: response.data.cast },
          ]);
        });
      });
    }
  }, [movies]);
  //console.log(movies);
  console.log(actorContent);
  //console.log(actorContent);
  return (
    <>
      {actorContent.map((actor: any) => (
        <>
          <h2>{actor.movie.title}</h2>

          {actor.cast.map((value: any) => {
            return (
              <>
                <img
                  src={`${requests.image}${value.profile_path}`}
                  alt={value.name}
                />
                <p>{value.name}</p>
              </>
            );
          })}
        </>
      ))}
    </>
  );
};

export default ActorList;
