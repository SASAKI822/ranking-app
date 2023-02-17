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
    mediaType: "",
  },
});

//TV情報
export const TVInfoState = atom({
  key: "TVInfoState",
  default: {
    id: "",
    title: "",
    overview: "",
    release_date: "",
    video: "",
    mediaType: "",
  },
});

//俳優情報
export const ActorInfoState = atom({
  key: "ActorInfoState",
  default: [],
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

export const RegisterActorListState = atom({
  key: "RegisterActorListState",
  default: [],
});

//映画ジャンル
export const MovieGenreIdState = atom({
  key: "MovieGenreIdState",
  default: {
    id: "",
  },
});

export const SidebarState = atom({
  key: "sidebarState",
  default: false,
});
