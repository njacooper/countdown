const {
  swapLetters,
  binarySortString,
  findLetterInString,
  binarySearchForLetter,
  importDictionary
} = require('./words')

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

test('Find a letter in a given array and return its index', () => {
  expect(
    binarySearchForLetter('e', ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'])
  ).toBe(4)
})

test('Import words seperated by a new line from a txt file. Expect 194,433 words to be imported.', () => {
  expect(importDictionary().length).toBe(194433)
})
