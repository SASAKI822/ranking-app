import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

export const API_KEY = process.env.NEXT_PUBLIC_APP_API_KEY;

export const requests = {
  home: "https://api.themoviedb.org/3",
  actor: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Jack+Reacher`,
  image: "https://image.tmdb.org/t/p/w185/",
  search: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`,
  fetchTopRated: `/discover/tv?api_key=${API_KEY}&languager=en-us`,
};
export const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});
const MovieApi = () => {
  return <></>;
};

export default MovieApi;
