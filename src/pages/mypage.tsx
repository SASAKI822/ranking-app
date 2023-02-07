import Header from "@/components/layouts/Header";
import ActorList from "@/features/components/ActorList";
import MovieList from "@/features/components/MovieList";
import MovieSearch from "@/features/components/MovieSearch";
import { instance, requests } from "@/lib/MovieApi";

const mypage = () => {
  return (
    <>
      <ActorList actorUrl={requests.actor} />
      <MovieSearch searchUrl={requests.search} />
      <MovieList
        fetchUrl={requests.home + requests.fetchTopRated}
        title="TopRated"
      />
    </>
  );
};

export default mypage;
