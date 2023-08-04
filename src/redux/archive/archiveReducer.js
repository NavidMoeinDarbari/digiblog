const initialState = {
   savedArticles: []
}

export const archiveReducer = (state=initialState, action) => {
   switch(action.type) {
      case 'ADD': 
         if(!state.savedArticles.find(item => item.id === action.payload.id)) {
            state.savedArticles.unshift(action.payload)
         }
         return {
            savedArticles: [...state.savedArticles]
         }
      case 'REMOVE':
         const newSavedArticles = state.savedArticles.filter(item => item.id !== action.payload.id)
         return {
            savedArticles: [...newSavedArticles]
         }
      case 'CLEAR': 
         return {
            savedArticles: []
         }
      default:
         return state;
   }
}