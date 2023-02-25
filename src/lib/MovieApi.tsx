import axios from "axios";
import React from "react";

export const API_KEY = process.env.NEXT_PUBLIC_APP_API_KEY;

export const Home = "https://api.themoviedb.org/3";

export const requests = {
  home: "https://api.themoviedb.org/3",
  actor: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Jack+Reacher`,
  image: "https://image.tmdb.org/t/p/w185/",
  search: `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}`,
  genre: {
    fetchTrending: `${Home}/trending/all/week?api_key=${API_KEY}&language=ja`,
    fetchNetflixOriginals: `${Home}/discover/tv?api_key=${API_KEY}&with_networks=213&language=ja`,
    fetchTopRated: `${Home}/discover/movie?api_key=${API_KEY}&language=ja`,
    fetchActionMovies: `${Home}/discover/movie?api_key=${API_KEY}&with_genres=28&language=ja`,
    fetchComedyMovies: `${Home}/discover/movie?api_key=${API_KEY}&with_genres=35&language=ja`,
    fetchHorrorMovies: `${Home}/discover/movie?api_key=${API_KEY}&with_genres=27&language=ja`,
    fetchRomanceMovies: `${Home}/discover/movie?api_key=${API_KEY}&with_genres=10749&language=ja`,
    fetchDocumentaryMovies: `${Home}/discover/movie?api_key=${API_KEY}&with_genres=99&language=ja`,
    fetchAnimation: `${Home}/discover/movie?api_key=${API_KEY}&with_genres=16&language=ja`,
    fetchFantasyMovies: `${Home}/discover/movie?api_key=${API_KEY}&with_genres=14&language=ja`,
    fetchDrama: `${Home}/discover/movie?api_key=${API_KEY}&with_genres=18&language=ja`,
    fetchMysteryMovies: `${Home}/discover/movie?api_key=${API_KEY}&with_genres=9648&language=ja`,
    fetchAdventureMovies: `${Home}/discover/movie?api_key=${API_KEY}&with_genres=12&language=ja`,
    allMovieOfActor: `${Home}/discover/movie?api_key=${API_KEY}&with_people=287&language=ja`,
    searchGenre: `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,
    popularActor: `${Home}/person/popular?api_key=${API_KEY}`,
  },
  filter: {
    popular: `&sort_by=popularity.desc`, //人気のある
    releaseDateDesc: `&sort_by=primary_release_date.desc`, //最近の映画
    voteAverageDesc: `&sort_by=vote_average.desc`, //評価が高い順
    primaryReleaseYear: `&primary_release_year=2014`, //2014年に公開された最高の映画
  },
};
console.log(requests.genre.searchGenre);
export const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});
const MovieApi = () => {
  return <></>;
};

export default MovieApi;
