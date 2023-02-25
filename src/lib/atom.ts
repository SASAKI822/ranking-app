import { atom, RecoilState } from "recoil";

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
  default: "ハリー",
});

// keyword映画検索結果
export const searchMovieResultState = atom({
  key: "searchMovieResultState",
  default: [],
});

// 型を推論してくれるので、こちらの方が良い
// keyword俳優検索
export const searchActorKey = atom({
  key: "searchActorKey",
  default: "Tom",
});

// レスポンスを元に定義して型を指定
// keyword俳優検索結果
export const searchActorResultState = atom<ActorListItem[]>({
  key: "searchActorResultState",
  default: [],
});

// 配列であるため型を変更
//映画情報
export const MovieInfoState = atom({
  key: "MovieInfoState",
  default: [],
});

// ジェネリクスを使って型を指定
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

// 型を推論してくれるので、こちらの方が良い
//映画ジャンル
export const MovieGenreIdState = atom({
  key: "MovieGenreIdState",
  default: {
    id: "",
  },
});

// 型を推論してくれるので、こちらの方が良い
export const SidebarState = atom({
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
