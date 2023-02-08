import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

export const API_KEY = process.env.NEXT_PUBLIC_APP_API_KEY;

export const requests = {
  home: "https://api.themoviedb.org/3",
  actor: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Jack+Reacher`,
  image: "https://image.tmdb.org/t/p/w185/",
  search: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`,
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-us`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/discover/tv?api_key=${API_KEY}&languager=en-us`,
  fetchActionMovies: `/discover/tv?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/tv?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/tv?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/tv?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentMovies: `/discover/tv?api_key=${API_KEY}&with_genres=99`,
};
export const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});
const MovieApi = () => {
  return <></>;
};

export default MovieApi;
