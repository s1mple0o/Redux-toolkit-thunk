import { configureStore } from "@reduxjs/toolkit";
import PostReducer from "./post/postSlice";

export default configureStore({
  reducer: {
    posts: PostReducer,
  },
});
