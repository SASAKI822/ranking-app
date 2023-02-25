import ActorList from "@/features/components/ActorListContent";
import { requests } from "@/lib/MovieApi";

// JSXの書かれたコンポーネントは大文字始まり
// 英単語で区切ったキャメルケースで書く
const MyPage = () => {
  return (
    <>
      <ActorList actorUrl={requests.actor} />
    </>
  );
};

export default MyPage;
