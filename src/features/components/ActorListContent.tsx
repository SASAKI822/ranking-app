import { API_KEY, requests } from "@/lib/MovieApi";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

type ActorProps = {
  actorUrl: string;
};

const ActorListContent: any = ({ actorUrl }: ActorProps) => {
  const [movies, setMovies] = useState<any>([]);
  const [detailActors, setDetailActors] = useState<any>([]);
  const [actorContent, setActorContent] = useState<any>([]);

  useEffect(() => {
    const fetchActorData = async () => {
      const response: any = await axios.get(actorUrl);
      setMovies(response.data.results);

      return response;
    };

    fetchActorData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // レスポンスを格納するようの変数
    const actorList: any[] = [];

    // 出演者情報取得APIを呼び出すためのメソッド
    const dataFetch = async (url: string, actorList: any[]) => {
      const cast = await axios.get(url).then((response) => {
        return response.data.cast;
      });
      actorList.push(cast);
    };

    // 出演者情報APIのURLのリスト
    const actorUrlList = movies.map((movie: any) => {
      return `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${API_KEY}`;
    });

    // 出演者情報APIのURLのリストに基づいて順番にリクエストを行う
    actorUrlList.forEach((url: string, index: number) => {
      dataFetch(url, actorList).then(() => {
        // 出演者の情報と映画の情報を組み合わせて一覧にする
        const newList = movies.map((movie: any, index: number) => {
          return {
            movie: movie,
            cast: actorList[index],
          };
        });
        // 組み合わせた一覧を展開してセットする
        setActorContent([...newList]);
      });
    });

    setDetailActors(actorList);
  }, [movies]);
  console.log(actorContent);
  return (
    <>
      {actorContent.length > 0 &&
        actorContent.map((actor: any) => (
          <div key={actor.id}>
            <h2>{actor.movie.title}</h2>
            {actor.cast &&
              actor.cast.length > 0 &&
              actor.cast.map((value: any) => {
                return (
                  <div key={value.name}>
                    <p>{value.name}</p>
                    <Link href={{ pathname: `/actor/${value.id}` }}>
                      <img
                        src={`${requests.image}${value.profile_path}`}
                        alt={value.name}
                      />
                    </Link>
                  </div>
                );
              })}
          </div>
        ))}
    </>
  );
};

export default ActorListContent;
