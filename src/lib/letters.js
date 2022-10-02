//get all vowels
const getAllVowels = () => {
  //Countdown Vowels
  let vowelA = 'aaaaaaaaaaaaaaa'
  let vowelE = 'eeeeeeeeeeeeeeeeeeeee'
  let vowelI = 'iiiiiiiiiiiii'
  let vowelO = 'ooooooooooooo'
  let vowelU = 'uuuuu'

  let vowels = vowelA + vowelE + vowelI + vowelO + vowelU

  vowels = vowels.split('')

  return vowels
}

//get all consonants
const getAllConsonants = () => {
  //Countdown Consonants
  let consonantB = 'bb'
  let consonantC = 'ccc'
  let consonantD = 'dddddd'
  let consonantF = 'ff'
  let consonantG = 'ggg'
  let consonantH = 'hh'
  let consonantJ = 'j'
  let consonantK = 'k'
  let consonantL = 'lllll'
  let consonantM = 'mmmm'
  let consonantN = 'nnnnnnnn'
  let consonantP = 'pppp'
  let consonantQ = 'q'
  let consonantR = 'rrrrrrrrr'
  let consonantS = 'sssssssss'
  let consonantT = 'ttttttttt'
  let consonantV = 'v'
  let consonantW = 'w'
  let consonantX = 'x'
  let consonantY = 'y'
  let consonantZ = 'z'

  let consonants =
    consonantB +
    consonantC +
    consonantD +
    consonantF +
    consonantG +
    consonantH +
    consonantJ +
    consonantK +
    consonantL
  consonants +=
    consonantM +
    consonantN +
    consonantP +
    consonantQ +
    consonantR +
    consonantS +
    consonantT +
    consonantV +
    consonantW
  consonants += consonantX + consonantX + consonantY + consonantZ

  consonants = consonants.split('')

  return consonants
}

//retrieve all vowels, shuffle and then return shuffled array
const getShuffledVowels = () => {
  let vowels = getAllVowels()
  vowels = shuffleLetters(vowels)
  return vowels
}

//retrieve all consonants, shuffle and then return shuffled array
const getShuffledConsonants = () => {
  let consonants = getAllConsonants()
  consonants = shuffleLetters(consonants)
  return consonants
}

//shuffle letters 1000 times
const shuffleLetters = letters => {
  let shuffleCount = 1000

  let randFrom = 0
  let randTo = 0

  //Perform swaps
  for (let i = 0; i < shuffleCount; i++) {
    //Get random from value within range of array
    randFrom = Math.floor(Math.random() * letters.length)

    //Get random to value within range of array
    randTo = Math.floor(Math.random() * letters.length)

    //Swap values over
    let tmp = letters[randTo]
    letters[randTo] = letters[randFrom]
    letters[randFrom] = tmp
  }

  let shuffleLetters = letters
  return shuffleLetters
}

module.exports = {
  getAllVowels,
  getAllConsonants,
  getShuffledVowels,
  getShuffledConsonants,
  shuffleLetters
}
