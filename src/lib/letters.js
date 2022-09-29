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

module.exports = { getAllVowels }
