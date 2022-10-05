const {findWordsFromLetters} = require('./lib/words')

onmessage = async function (e) {
    let { data } = e
    
    console.log('Posting message back with data: ', data)

    let res = findWordsFromLetters(data)
  
    postMessage(res)
  }