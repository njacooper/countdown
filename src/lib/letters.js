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

module.exports = { getAllVowels, getAllConsonants }
