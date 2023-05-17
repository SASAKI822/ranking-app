import axios from "axios";
import React from "react";

export const API_KEY = process.env.NEXT_PUBLIC_APP_API_KEY;

export const HOME = "https://api.themoviedb.org/3";

export const requests = {
  ACTOR: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Jack+Reacher`,
  IMAGE: "https://image.tmdb.org/t/p/w185/",
  SEARCH: `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}`,
  SEARCH_COMPANY: `https://api.themoviedb.org/3/search/company?api_key=${API_KEY}`,
  GENRE: {
    FETCH_TRENDING: `${HOME}/trending/all/week?api_key=${API_KEY}&language=ja`,
    FETCH_NETFLIX_ORIGINALS: `${HOME}/discover/tv?api_key=${API_KEY}&with_networks=213&language=ja`,
    FETCH_TOP_RATED: `${HOME}/discover/movie?api_key=${API_KEY}&language=ja`,
    FETCH_ACTION_MOVIES: `${HOME}/discover/movie?api_key=${API_KEY}&with_genres=28&language=ja`,
    FETCH_COMEDY_MOVIES: `${HOME}/discover/movie?api_key=${API_KEY}&with_genres=35&language=ja`,
    FETCH_HORROR_MOVIES: `${HOME}/discover/movie?api_key=${API_KEY}&with_genres=27&language=ja`,
    FETCH_ROMANCE_MOVIES: `${HOME}/discover/movie?api_key=${API_KEY}&with_genres=10749&language=ja`,
    FETCH_DOCUMENTARY_MOVIES: `${HOME}/discover/movie?api_key=${API_KEY}&with_genres=99&language=ja`,
    FETCH_ANIMATION: `${HOME}/discover/movie?api_key=${API_KEY}&with_genres=16&language=ja`,
    FETCH_FANTASY_MOVIES: `${HOME}/discover/movie?api_key=${API_KEY}&with_genres=14&language=ja`,
    FETCH_DRAMA: `${HOME}/discover/movie?api_key=${API_KEY}&with_genres=18&language=ja`,
    FETCH_MYSTERY_MOVIES: `${HOME}/discover/movie?api_key=${API_KEY}&with_genres=9648&language=ja`,
    FETCH_ADVENTURE_MOVIES: `${HOME}/discover/movie?api_key=${API_KEY}&with_genres=12&language=ja`,
    ALL_MOVIE_OF_ACTOR: `${HOME}/discover/movie?api_key=${API_KEY}&with_people=287&language=ja`,
    POPULAR_ACTOR: `${HOME}/person/popular?api_key=${API_KEY}`,
  },
  FILTER: {
    POPULAR: `&sort_by=popularity.desc`, //人気のある
    RELEASE_DATE_DESC: `&sort_by=primary_release_date.desc`, //最近の映画
    VOTE_AVERAGE_DESC: `&sort_by=vote_average.desc`, //評価が高い順
    PRIMARY_RELEASE_YEAR: `&primary_release_year=2014`, //2014年に公開された最高の映画
  },
};

export const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});
