export const titleSplitter = (text , number) => {
   const textLength = text.split(' ')
   if(textLength.length > number) {
      textLength.length = number
      let newText = textLength.join(' ').concat('...')
      return newText
   }
   else return text
}

