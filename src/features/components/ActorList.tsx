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

  // MovieApiからactorUrlを取得しデータをMoviesへ格納
  useEffect(() => {
    async function fetchActorData() {
      const request: any = await axios.get(actorUrl);
      setMovies(request.data.results);
      return request;
    }

    fetchActorData();
  }, [actorUrl]);

  // 映画の情報を取得しmovie情報とactor情報をactorContentに格納
  useEffect(() => {
    const actorContentList: any[] = [];
    const actorList = movies.map((movie: any) => {
      const actorUrl = `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${API_KEY}`;
      axios
        .get(actorUrl)
        .then((response) => {
          actorContentList.push({
            movie,
            cast: response.data.cast,
          });

          return response.data.cast;
        })
        .catch((error) => {
          console.log(error.response);
        });
    });
    setDetailActors(actorList);
    setActorContent(actorContentList);
  }, [movies]);
  //console.log(movies);
  //console.log(actorContent);

  return (
    <>
      {actorContent.map((actor: any) => {
        console.log(actorContent);
        {
          actor.cast.map((value: any) => {
            return (
              <>
                <div key={actor.id}>
                  <h2>{actor.movie.title}</h2>
                  <div key={value.id}>
                    <p>{value.name}</p>
                    <img
                      src={`${requests.image}${value.profile_path}`}
                      alt={value.name}
                    />
                  </div>
                </div>
              </>
            );
          });
        }
      })}
    </>
  );
};

export default ActorList;
// {actor.cast.map((value: any) => {
//   //console.log(value);
//   return (
//     <>

//     </>
//   );
// })}
