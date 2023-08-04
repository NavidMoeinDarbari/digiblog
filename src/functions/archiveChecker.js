const archiveChecker = (state , slug) => {
   const result = !!state.find(item => item.slug === slug)
   return result
}

export default archiveChecker;