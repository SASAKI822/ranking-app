import { atom, RecoilState } from "recoil";

type InfoType = RecoilState<{
  id: string;
  title: string;
  overview: string;
  release_date: string;
  video: string;
  mediaType: string;
}>;

// keyword映画検索
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
export const searchActorKey: RecoilState<string> = atom({
  key: "searchActorKey",
  default: "Tom",
});

// keyword俳優検索結果
export const searchActorResultState = atom({
  key: "searchActorResultState",
  default: [],
});

//映画情報
export const MovieInfoState: InfoType = atom({
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
export const TVInfoState: InfoType = atom({
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
const registerActorList: any[] = [];
export const RegisterActorListState = atom({
  key: "RegisterActorListState",
  default: registerActorList,
});

//映画ジャンル
export const MovieGenreIdState: RecoilState<{
  id: string;
}> = atom({
  key: "MovieGenreIdState",
  default: {
    id: "",
  },
});

export const SidebarState: RecoilState<boolean> = atom({
  key: "sidebarState",
  default: false,
});

export const usersState = atom({
  key: "usersState",
  default: {
    id: "",
  },
});

export const loginState = atom({
  key: "loginState",
  default: false,
});
