import Link from "next/link";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import { requests } from "@/lib/MovieApi";
import { db } from "@/lib/firebase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { Movie } from "./MovieGenre";
import { InfoType, uIdState, WatchListState } from "@/lib/atom";
import { useRecoilState } from "recoil";

type MoviesProps = {
  movies: InfoType[];
};

// Header コンポーネント

const MovieList = ({ movies }: MoviesProps) => {
  // ユーザーid
  const [userId, setUserId] = useRecoilState(uIdState);
  // 映画リスト
  const [watchList, setWatchList] = useRecoilState(WatchListState);

  // 映画登録
  const handleAddWatch = async (
    e: React.MouseEvent<HTMLInputElement>,
    movie: Movie
  ) => {
    e.preventDefault();

    // 映画重複フィルター
    const contain = watchList.filter((value: any) => {
      return value.id === movie.id;
    });

    // 　映画追加
    if (contain.length === 0) {
      const collectionPath = collection(db, "users", userId, "movies");
      const q = query(collectionPath);
      setWatchList([movie]);
      await getDocs(q).then((querySnapshot) => {
        const moviesDocumentRef = addDoc(collectionPath, {
          id: movie.id,
          title: movie.title ? movie.title : "",
          mediaType: movie.media_type ? movie.media_type : "",
          releaseDate: movie.release_date ? movie.release_date : "",
          video: movie.video ? movie.video : "",
          overview: movie.overview ? movie.overview : "",
          posterPath: movie.poster_path ? movie.poster_path : "",
        });
      });
    } else {
      window.alert("すでに追加されています。");
    }
  };

  return (
    <>
      <ImageList
        gap={10}
        sx={{
          mb: 8,
          gridTemplateColumns:
            "repeat(auto-fill, minmax(180px, 1fr))!important",
        }}
      >
        {movies &&
          movies.length > 0 &&
          movies.map((movie: any) => {
            return (
              <ImageListItem
                key={movie.img}
                sx={{ maxWidth: "185px", placeSelf: "center" }}
              >
                <Link
                  style={{ textAlign: "center", maxWidth: "185px" }}
                  href={{
                    pathname: `/movie/${movie.id}`,
                    query: {
                      id: movie.id,
                      title: movie.title,
                      mediaType: movie.media_type,
                      overview: movie.overview,
                      releaseDate: movie.release_date,
                      posterPath: movie.poster_path,
                    },
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${requests.image}${movie.poster_path}`}
                    alt="movie image"
                    style={{ backgroundColor: "#dbdbdb" }}
                  />
                  <ImageListItemBar
                    sx={{
                      background: "rgba(0, 0, 0, 0.7);",
                      "& .MuiImageListItemBar-title": {
                        textAlign: "start",
                        overflow: "auto",
                        whiteSpace: "normal",
                      },
                      "& .MuiImageListItemBar-positionBottom ": {
                        background: "rgba(255, 255, 255, 0.94)",
                      },
                    }}
                    title={movie.title ? movie.title : movie.name}
                    // subtitle={movie.name}
                    actionIcon={
                      <IconButton
                        sx={{
                          color: "rgba(255, 255, 255, 0.54)",
                          height: "30px",
                        }}
                        aria-label={`info about ${movie.title}`}
                        // 見た映画登録ボタン
                        onClick={(e: any) => {
                          handleAddWatch(e, movie);
                        }}
                      >
                        +
                      </IconButton>
                    }
                  />
                </Link>
              </ImageListItem>
            );
          })}
      </ImageList>
    </>
  );
};
export default MovieList;
