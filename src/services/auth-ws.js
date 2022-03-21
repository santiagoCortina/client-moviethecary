import { api } from "./api";
import { successStatus, internalServerError } from "../utils/clear-res";

export const loginWs = (credentials) =>
  api
    .post("/auth/login", credentials)
    .then(successStatus)
    .catch(internalServerError);

export const signupWs = (credentials) =>
  api
    .post("/auth/signup", credentials)
    .then(successStatus)
    .catch(internalServerError);

export const logoutWs = () =>
  api.post("/auth/logout").then(successStatus).catch(internalServerError);

export const getUserWs = () =>
  api.get("auth/getUser").then(successStatus).catch(internalServerError);

// // ejemplo params
// export const getAnimes = (credentials, animeId) =>
//   api.post(`/anime/getAnime/${animeId}`, credentials);
