import MovieGenre from "@/features/components/MovieGenre";
import { WatchListState } from "@/lib/atom";
import { API_KEY, requests } from "@/lib/MovieApi";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";

import { useRouter } from "next/router";

const MovieGenreDetail = ({ fetchUrl, pageId, title }: any) => {
  const [id, setId] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const setWatchList = useSetRecoilState(WatchListState);

  // fetchUrlのジャンルの映画が入る
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl + `&page=${pageId}`);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, []);

  console.log(id);
  return (
    <>
      <div style={{ marginTop: "20px", padding: "10px" }}>
        <h2>{title}</h2>
      </div>
      <ImageList
        gap={8}
        sx={{
          mb: 8,
          mt: 8,
          gridTemplateColumns:
            "repeat(auto-fill, minmax(180px, 1fr))!important",
        }}
      >
        {movies &&
          movies.length > 0 &&
          movies.map((movie: any) => {
            return (
              <>
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
                        overview: movie.overview,
                        releaseDate: movie.release_date,
                        posterPath: movie.poster_path,
                      },
                    }}
                  >
                    <img
                      src={`${requests.image}${movie.poster_path}`}
                      alt=""
                      style={{ backgroundColor: "#dbdbdb" }}
                    />

                    <ImageListItemBar
                      sx={{
                        "& .MuiImageListItemBar-title": {
                          textAlign: "start",
                          overflow: "auto",
                          whiteSpace: "normal",
                        },
                        "& .MuiImageListItemBar-positionBottom ": {
                          background: "rgba(255, 255, 255, 0.94)",
                        },
                      }}
                      title={movie.title}
                      actionIcon={
                        <IconButton
                          sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                          aria-label={`info about ${movie.title}`}
                          onClick={(e: any) => {
                            e.preventDefault();
                            setWatchList((a: any) => {
                              return [...a, movie];
                            });
                          }}
                        >
                          +
                        </IconButton>
                      }
                    />
                  </Link>
                </ImageListItem>
              </>
            );
          })}
      </ImageList>
      {(function () {
        const list = [];
        for (let i = 1; i < 10; i++) {
          list.push(
            <Link href={{ pathname: `${i}`, query: { id: i } }}>
              <li key={i}>{i}</li>
            </Link>
          );
        }
        return <ul>{list}</ul>;
      })()}
    </>
  );
};

export default MovieGenreDetail;
