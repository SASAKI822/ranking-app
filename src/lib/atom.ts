import { atom } from "recoil";

// keyword検索
export const searchKey = atom({
  key: "searchKey",
  default: "ハリー",
});

//映画情報
export const MovieInfoState = atom({
  key: "MovieInfoState",
  default: {
    id: "",
    title: "",
    overview: "",
    release_date: "",
    video: "",
  },
});

//俳優情報
export const ActorInfoState = atom({
  key: "ActorInfoState",
  default: {
    id: "",
    name: "",
  },
});

//見る映画リスト
const watchList: any[] = [];
export const WatchListState = atom({
  key: "WatchListState",
  default: watchList,
});

// 見た映画リスト
const watchedList: any[] = [];
export const WatchedListState = atom({
  key: "WatchedListState",
  default: watchedList,
});

export const MovieGenreIdState = atom({
  key: "MovieGenreIdState",
  default: {
    id: "",
  },
});
