import { api } from "./api";
import { successStatus, internalServerError } from "../utils/clear-res";

export const enlistPlaylistsWs = () => {
  return api.get("/playlist/").then(successStatus).catch(internalServerError);
};

export const createPlaylistWS = (playlist) => {
  return api
    .post("/playlist/create", playlist)
    .then(successStatus)
    .catch(internalServerError);
};

export const updatePlaylistAddWs = (data) => {
  return api
    .post("/playlist/update", data)
    .then(successStatus)
    .catch(internalServerError);
};
