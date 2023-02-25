import ActorList from "@/features/components/ActorListContent";

import { requests } from "@/lib/MovieApi";

const mypage = () => {
  return (
    <>
      <ActorList actorUrl={requests.actor} />
    </>
  );
};

export default mypage;
