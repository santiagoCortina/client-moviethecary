import { api } from "./api";
import { successStatus, internalServerError } from "../utils/clear-res";

export const addFavWs = (movie, user) => {
  const favMovie = {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
  };

  const data = {
    _user: user,
    movie: favMovie,
  };
  return api
    .post("/favourites/addMovie", data)
    .then(successStatus)
    .catch(internalServerError);
};

export const enlistFavWs = () => {
  return api.get("/favourites/").then(successStatus).catch(internalServerError);
};
