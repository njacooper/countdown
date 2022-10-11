import { useState, useEffect } from 'react'

function Results (props) {
  const [results, setResults] = useState([])
  const [three, setThree] = useState([])
  const [four, setFour] = useState([])
  const [five, setFive] = useState([])
  const [six, setSix] = useState([])
  const [seven, setSeven] = useState([])
  const [eight, setEight] = useState([])
  const [nine, setNine] = useState([])

  useEffect(() => {
    setResults(props.results)
    setThree(props.results.filter(result => result.length == 3))
    setFour(props.results.filter(result => result.length == 4))
    setFive(props.results.filter(result => result.length == 5))
    setSix(props.results.filter(result => result.length == 6))
    setSeven(props.results.filter(result => result.length == 7))
    setEight(props.results.filter(result => result.length == 8))
    setNine(props.results.filter(result => result.length == 9))
  }, [props])

  return (
    <>
      <div className='z-50'>
        {results.length == 0 ? (
          <h3>No results!</h3>
        ) : (
          <>
            <div className='mb-6'>
              <h3>Results of Nine</h3>
              <div className='flex flex-wrap gap-4'>
                {nine.map(result => (
                  <p
                    className='px-3 py-2 bg-blue-300 rounded w-fit'
                    key={result.word}
                  >
                    {result.word}
                  </p>
                ))}
                {nine.length == 0 && <p>No Nines!</p>}
              </div>
            </div>

            <div className='mb-6'>
              <h3>Results of Eight</h3>
              <div className='flex flex-wrap gap-4'>
                {eight.map(result => (
                  <p
                    className='px-3 py-2 bg-blue-300 rounded w-fit'
                    key={result.word}
                  >
                    {result.word}
                  </p>
                ))}
                {eight.length == 0 && <p>No Eights!</p>}
              </div>
            </div>

            <div className='mb-6'>
              <h3>Results of Seven</h3>
              <div className='flex flex-wrap gap-4'>
                {seven.map(result => (
                  <p
                    className='px-3 py-2 bg-blue-300 rounded w-fit'
                    key={result.word}
                  >
                    {result.word}
                  </p>
                ))}
                {seven.length == 0 && <p>No Sevens!</p>}
              </div>
            </div>

            <div className='mb-6'>
              <h3>Results of Six</h3>
              <div className='flex flex-wrap gap-4'>
                {six.map(result => (
                  <p
                    className='px-3 py-2 bg-blue-300 rounded w-fit'
                    key={result.word}
                  >
                    {result.word}
                  </p>
                ))}
                {six.length == 0 && <p>No Sixes!</p>}
              </div>
            </div>

            <div className='mb-6'>
              <h3>Results of Five</h3>
              <div className='flex flex-wrap gap-4'>
                {five.map(result => (
                  <p
                    className='px-3 py-2 bg-blue-300 rounded w-fit'
                    key={result.word}
                  >
                    {result.word}
                  </p>
                ))}

                {five.length == 0 && <p>No Fives!</p>}
              </div>
            </div>

            <div className='mb-6'>
              <h3>Results of Four</h3>
              <div className='flex flex-wrap gap-4'>
                {four.map(result => (
                  <p
                    className='px-3 py-2 bg-blue-300 rounded w-fit'
                    key={result.word}
                  >
                    {result.word}
                  </p>
                ))}

                {four.length == 0 && <p>No Fours!</p>}
              </div>
            </div>

            <div className='mb-6'>
              <h3>Results of Three</h3>
              <div className='flex flex-wrap gap-4'>
                {three.map(result => (
                  <p
                    className='px-3 py-2 bg-blue-300 rounded w-fit'
                    key={result.word}
                  >
                    {result.word}
                  </p>
                ))}

                {three.length == 0 && <p>No Threes!</p>}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Results
