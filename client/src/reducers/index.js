import { combineReducers } from "redux";

import posts from "./posts";
import auth from "./auth";
import users from "./user";
import alert from "./alert";
export const reducers = combineReducers({ posts, auth, users, alert });
