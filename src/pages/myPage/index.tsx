import Header from "@/components/layouts/Header";
import ActorList from "@/features/components/ActorListContent";

import { instance, requests } from "@/lib/MovieApi";

const mypage = () => {
  return (
    <>
      <ActorList actorUrl={requests.actor} />
      {/* <MovieList
        fetchUrl={requests.home + requests.fetchTopRated}
        title="TopRated"
      /> */}
    </>
  );
};

export default mypage;
