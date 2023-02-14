import { atom } from "recoil";

// keyword検索
export const searchMovieKey = atom({
  key: "searchMovieKey",
  default: "ハリー",
});

// keyword映画検索結果
export const searchMovieResultState = atom({
  key: "searchMovieResultState",
  default: [],
});

// keyword俳優検索
export const searchActorKey = atom({
  key: "searchActorKey",
  default: "Tom",
});

// keyword俳優検索結果
export const searchActorResultState = atom({
  key: "searchActorResultState",
  default: [],
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

// 登録俳優リスト
const ActorList: any[] = [];
export const RegisterActorListState = atom({
  key: "RegisterActorListState",
  default: ActorList,
});

//映画ジャンル
export const MovieGenreIdState = atom({
  key: "MovieGenreIdState",
  default: {
    id: "",
  },
});
