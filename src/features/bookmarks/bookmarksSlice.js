import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   bookmarkedItems: []
}

const bookmarksSlice = createSlice({
   name: 'bookmarks',
   initialState,
   reducers: {
      add: (state , action) => {
         if(!state.bookmarkedItems.find(item => item.id === action.payload.id)) {
            state.bookmarkedItems.unshift(action.payload)
         }
      },
      remove: (state , action) => {
         state.bookmarkedItems = state.bookmarkedItems.filter(item => item.id !== action.payload.id)
      },
      clear: (state) => {
         state.bookmarkedItems = []
      }
   }
})

export default bookmarksSlice.reducer
export const {add, remove, clear} = bookmarksSlice.actions