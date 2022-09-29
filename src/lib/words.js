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

const findLetterInString = (letter, string) => {
  let letterExists = false

  let stringArray = string.split('')

  for (let i = 0; i < stringArray.length; i++) {
    if (letter == stringArray[i]) {
      return (letterExists = true)
    }
  }
  return letterExists
}

const binarySearchForLetter = (letter, lettersArray) => {
  let left = 0
  let right = lettersArray.length - 1

  console.log('letter', letter)
  console.log('letters array', lettersArray)

  while (left <= right) {
    //let middle = (left + right) / 2
    //let middle = Math.floor(lettersArray.length / 2)
    let middle = Math.floor((left + right) / 2)

    //check if letter exists in the middle of the letters array
    if (letter == lettersArray[middle]) {
      return middle
    }

    //check if the letters value is less than the letter at the middle of the letters array
    if (letter < lettersArray[middle]) {
      //resize the area to check
      right = middle - 1
    } else {
      //resize the area to check
      left = middle + 1
    }
    //repeat
  }

  //Letter not found
  return -1
}

module.exports = {
  swapLetters,
  binarySortString,
  findLetterInString,
  binarySearchForLetter
}
