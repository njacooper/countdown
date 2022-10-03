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

const importDictionary = () => {
  //import words from dictionary
  var words = require('./dictionary')

  //split words into array
  words = words.split('\n')

  //return array
  return words
}

const findWordsFromLetters = letters => {
  let count = 0
  //let letters = 'aeaedvnfh'

  let foundWords = []

  let dictionary = importDictionary()

  //loop over dictionary words
  for (let i = 0; i < dictionary.length; i++) {
    let removedLetterCount = 0
    let found = -1

    let word = dictionary[i]

    //sort dictionary word alphabetically
    let sortedWord = binarySortString(word)

    //split dictionary word into array
    let wordArray = sortedWord.split('')

    //Alphabetize letters
    let sortedLetters = binarySortString(letters)

    //split letters string into array
    let lettersArray = sortedLetters.split('')

    //
    for (let i = 0; i < wordArray.length; i++) {
      //find out if letter from word exists in letters. returns the index location of the found letter
      found = binarySearchForLetter(wordArray[i], lettersArray)

      if (found != -1) {
        //update letters array by removing found letter
        lettersArray.splice(found, 1)

        removedLetterCount++
      }
    }
    //check if the number of found letters is equal to the word size
    if (removedLetterCount == word.length && word.length >= 3) {
      //add word to found words array
      foundWords.push({ length: word.length, word: word })
    }
  }

  return foundWords
}

module.exports = {
  swapLetters,
  binarySortString,
  findLetterInString,
  binarySearchForLetter,
  importDictionary,
  findWordsFromLetters
}
