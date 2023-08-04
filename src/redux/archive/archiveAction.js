const addToArchive = (article) => {
   return {type: 'ADD', payload: article}
}

const removeFromArchive = (article) => {
   return {type: 'REMOVE', payload: article}
}

const clearArchive = () => {
   return {type: 'CLEAR'}
}

export {addToArchive, removeFromArchive, clearArchive};