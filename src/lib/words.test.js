const { swapLetters, binarySortString, findLetterInString } = require('./words')

test('Expect the letters at specified indexes to be swapped with each other', () => {
  expect(
    swapLetters(3, 6, ['t', 'e', 'l', 's', 'v', 'i', 'e', 'i', 'o', 'n'])
  ).toEqual(['t', 'e', 'l', 'e', 'v', 'i', 's', 'i', 'o', 'n'])
})

test('Expect given string to be returned with letters arranged in alphabetical order', () => {
  expect(binarySortString('daefcgbh')).toBe('abcdefgh')
})

test('Check if a letter exists in a given string', () => {
  expect(findLetterInString('a', 'television')).not.toBe(true)
  expect(findLetterInString('e', 'television')).toBe(true)
})
