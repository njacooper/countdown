const swapLetters = (index1, index2, lettersArray) => {
  let temp = lettersArray[index1]
  lettersArray[index1] = lettersArray[index2]
  lettersArray[index2] = temp
  return lettersArray
}

module.exports = {
  swapLetters
}
