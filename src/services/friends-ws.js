import { api } from "./api";
import { successStatus, internalServerError } from "../utils/clear-res";

export const findFriends = (searchWord) => {
  return api
    .post("/friends/searchFriends", searchWord)
    .then(successStatus)
    .catch(internalServerError);
};

export const addFriendWs = (email) => {
  const data = {
    email: email,
  };

  return api
    .post("/friends/addFriend", data)
    .then(successStatus)
    .catch(internalServerError);
};

export const enlistFriendsWs = () => {
  return api.get("/friends").then(successStatus).catch(internalServerError);
};
