import { atom, RecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

export type InfoType = {
  id: string;
  title: string;
  overview: string;
  release_date: string;
  video: string;
  mediaType: string;
};

// APIのレスポンスから型を定義
type KnownFor = {
  adult: boolean;
  backdropPath: string;
  genreIds: number[];
  id: number;
  mediaType: string;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string;
  releaseDate: string;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
};

// APIのレスポンスから型を定義
export type ActorListItem = {
  adult: boolean;
  gender: number;
  id: number;
  knownFor: KnownFor[];
  knownForDepartment: string;
  name: string;
  originalName: string;
  popularity: number;
  profilePath: string;
};

// keyword映画検索
export const searchMovieKey = atom({
  key: "searchMovieKey",
  default: "",
});

// keyword映画検索結果
export const searchMovieResultState = atom({
  key: "searchMovieResultState",
  default: [],
});

// keyword俳優検索
export const searchActorKey = atom({
  key: "searchActorKey",
  default: "",
});

// keyword俳優検索結果
export const searchActorResultState = atom<ActorListItem[]>({
  key: "searchActorResultState",
  default: [],
});

//映画情報
export const MovieInfoState = atom({
  key: "MovieInfoState",
  default: [],
});

//TV情報
export const TVInfoState = atom<InfoType>({
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
export const MovieGenreIdState = atom({
  key: "MovieGenreIdState",
  default: {
    id: "",
  },
});

// サイドバー開閉状態
export const SidebarState = atom({
  key: "sidebarState",
  default: false,
});

//　ユーザー状態
export const usersState = atom({
  key: "usersState",
  default: {
    id: "",
  },
});

// ログイン状態
export const loginState = atom({
  key: "loginState",
  default: false,
});

// リコイル　sessionStorage で保存
const { persistAtom } = recoilPersist({
  //追加
  key: "recoil-persist",
  storage: typeof window === "undefined" ? undefined : sessionStorage,
});

// ユーザーid 保存
export const uIdState = atom({
  key: "uIdState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
