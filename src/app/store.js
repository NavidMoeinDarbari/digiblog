import { configureStore } from "@reduxjs/toolkit";
import bookmarksSlice from "../features/bookmarks/bookmarksSlice";

const store = configureStore({
   reducer: {bookmarks: bookmarksSlice}
})

export default store;