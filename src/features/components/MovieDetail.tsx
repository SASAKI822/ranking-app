import { MovieInfoState } from "@/lib/atom";
import { API_KEY, requests } from "@/lib/MovieApi";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

const MovieDetail = () => {
  const [movieCast, setMovieCast] = useState<any>("");
  const [movieVideo, setMovieVideo] = useState<any>([]);
  const [trailerMovie, setTrailerMovie] = useState<any>([]);

  const router = useRouter();

  const setMovieInfo = useSetRecoilState(MovieInfoState);
  //MovieInfo　情報　id, title 取得
  const movieInfo = useRecoilValue(MovieInfoState);
  const { id } = useRecoilValue(MovieInfoState);
  const { title } = useRecoilValue(MovieInfoState);
  const { overview } = useRecoilValue(MovieInfoState);
  const { release_date } = useRecoilValue(MovieInfoState);

  useEffect(() => {
    const movieDetailId: any = router.query.id;
    const movieDetailTitle: any = router.query.title;
    const movieDetailOverview: any = router.query.overview;
    const movieDetailReleaseDate: any = router.query.releaseDate;
    const movieDetailVideo: any = router.query.video;
    setMovieInfo({
      id: movieDetailId,
      title: movieDetailTitle,
      overview: movieDetailOverview,
      release_date: movieDetailReleaseDate,
      video: movieDetailVideo,
    });
  }, []);

  const CastUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`;
  const VideoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;

  // cast　情報をmovieCast に格納

  // video　情報をmovieVideo に格納
  useEffect(() => {
    async function fetchVideoData() {
      const request = await axios
        .get(VideoUrl)
        .then((response) => {
          setMovieVideo(response.data.results);
          async function fetchMovieData() {
            const request = await axios
              .get(CastUrl)
              .then((response) => {
                setMovieCast(response.data.cast);
              })
              .then((error) => {
                console.error(error);
              });

            return request;
          }
          fetchMovieData();
        })
        .then((error) => {
          console.error(error);
        });

      return request;
    }
    fetchVideoData();
  }, [VideoUrl]);

  useEffect(() => {
    {
      const trailerMovies = movieVideo.filter((value: any) => {
        return value.type === "Trailer";
      });

      setTrailerMovie(trailerMovies);
    }
  }, [movieVideo]);

  console.log(trailerMovie);
  return (
    <>
      <Link href="/movie">ホーム</Link>
      <h2>
        {title}
        <span>{release_date}</span>
      </h2>
      {trailerMovie.map((value: any) => {
        return (
          <>
            <ul>
              <li>
                <iframe
                  id="inline-frame"
                  width="40%"
                  style={{ border: "none" }}
                  src={`https://www.youtube.com/embed/${value.key}`}
                ></iframe>
              </li>
            </ul>
          </>
        );
      })}

      <p>{overview}</p>
      <ImageList
        gap={8}
        sx={{
          mb: 8,
          gridTemplateColumns:
            "repeat(auto-fill, minmax(180px, 1fr))!important",
        }}
        cols={4}
      >
        {movieCast &&
          movieCast.length > 0 &&
          movieCast.map((cast: any) => (
            <>
              {cast.profile_path && (
                <ImageListItem key={cast.img}>
                  <Link
                    style={{ textAlign: "center" }}
                    key={cast.id}
                    href={{
                      pathname: "/actor/[id]",
                      query: {
                        id: cast.id,
                        name: cast.name,
                        character: cast.character,
                      },
                    }}
                  >
                    <img src={`${requests.image}${cast.profile_path}`} />
                    <ImageListItemBar
                      title={cast.name}
                      subtitle={cast.author}
                      actionIcon={
                        <IconButton
                          sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                          aria-label={`info about ${cast.title}`}
                        >
                          <InfoIcon />
                        </IconButton>
                      }
                    />
                  </Link>
                </ImageListItem>
              )}
            </>
          ))}
      </ImageList>
    </>
  );
};

export default MovieDetail;
