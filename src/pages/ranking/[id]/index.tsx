import { API_KEY, requests } from "@/lib/MovieApi";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MovieId = () => {
  const [movieDetail, setMovieDetail] = useState([]);
  const [movieCast, setMovieCast] = useState([]);
  const [movieCrew, setMovieCrew] = useState([]);
  const router = useRouter();
  const movieDetailId = router.query.id;
  const movieDetailTitle = router.query.title;

  const actorUrl = `https://api.themoviedb.org/3/movie/${movieDetailId}/credits?api_key=${API_KEY}`;
  useEffect(() => {
    async function fetchDetailData() {
      const request = await axios.get(actorUrl);
      setMovieCast(request.data.cast);
      setMovieCrew(request.data.crew);
      return request;
    }

    fetchDetailData();
  }, []);
  console.log(movieCast);
  return (
    <>
      <ul>
        <h3>{movieDetailTitle}</h3>
        {movieCast &&
          movieCast.length > 0 &&
          movieCast.map((cast: any) => {
            return (
              <>
                c
                <div key={cast.id}>
                  <p>{cast.name}</p>
                  <img src={`${requests.image}${cast.profile_path}`} />
                </div>
              </>
            );
          })}
      </ul>
    </>
  );
};

export default MovieId;
{
}
