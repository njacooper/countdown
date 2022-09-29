const swapLetters = (index1, index2, lettersArray) => {
  let temp = lettersArray[index1]
  lettersArray[index1] = lettersArray[index2]
  lettersArray[index2] = temp
  return lettersArray
}

const binarySortString = letters => {
  let lettersArray = letters.split('')

  for (let i = 0; i < lettersArray.length; i++) {
    for (let j = i + 1; j < lettersArray.length; j++) {
      if (lettersArray[j] < lettersArray[i]) {
        swapLetters(i, j, lettersArray)
      }
    }
  }

  //Convert char array back to string
  let newLetters = lettersArray.join('')

  //Return sorted string
  return newLetters
}

module.exports = {
  swapLetters,
  binarySortString
}