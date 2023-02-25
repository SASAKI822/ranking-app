import ActorList from "@/features/components/ActorListContent";
import { requests } from "@/lib/MovieApi";

const MyPage = () => {
  return (
    <>
      <ActorList actorUrl={requests.actor} />
    </>
  );
};

export default MyPage;
