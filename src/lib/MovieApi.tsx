import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

export const API_KEY = process.env.NEXT_PUBLIC_APP_API_KEY;

export const Home = "https://api.themoviedb.org/3";

export const requests = {
  home: "https://api.themoviedb.org/3",
  actor: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Jack+Reacher`,
  image: "https://image.tmdb.org/t/p/w185/",
  search: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`,

  genre: {
    fetchTrending: `${Home}/trending/all/week?api_key=${API_KEY}&language=en-us`,
    fetchNetflixOriginals: `${Home}/discover/movie?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `${Home}/discover/movie?api_key=${API_KEY}&language=en-us`,
    fetchActionMovies: `${Home}/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `${Home}/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `${Home}/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `${Home}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaryMovies: `${Home}/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchAnimation: `${Home}/discover/movie?api_key=${API_KEY}&with_genres=16`,
    fetchFantasyMovies: `${Home}/discover/movie?api_key=${API_KEY}&with_genres=14`,
    fetchDrama: `${Home}/discover/movie?api_key=${API_KEY}&with_genres=18`,
    fetchMysteryMovies: `${Home}/discover/movie?api_key=${API_KEY}&with_genres=9648`,
    fetchAdventureMovies: `${Home}/discover/movie?api_key=${API_KEY}&with_genres=12`,
    allMovieOfActor: `${Home}/discover/movie?api_key=${API_KEY}&with_people=287`,
    searchGenre: `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,
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
