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
      <div className=''>
        <h2 className='font-bold text-2xl py-4'>Found Words:</h2>

        <div className='z-50'>
          {results.length == 0 ? (
            <p>No results yet!</p>
          ) : (
            <>
              <div className='p-4 bg-blue-100'>
                <p>Results of Nine</p>
                <div className='flex flex-wrap gap-4'>
                  {nine.map(result => (
                    <p className='px-3 py-2 bg-blue-300 rounded w-fit'>
                      {result.word}
                    </p>
                  ))}
                  {nine.length == 0 && <p>No Nines!</p>}
                </div>
              </div>

              <div className='p-4 bg-blue-100'>
                <p>Results of Eight</p>
                <div className='flex flex-wrap gap-4'>
                  {eight.map(result => (
                    <p className='px-3 py-2 bg-blue-300 rounded w-fit'>
                      {result.word}
                    </p>
                  ))}
                  {eight.length == 0 && <p>No Eights!</p>}
                </div>
              </div>

              <div className='p-4 bg-blue-100'>
                <p>Results of Seven</p>
                <div className='flex flex-wrap gap-4'>
                  {seven.map(result => (
                    <p className='px-3 py-2 bg-blue-300 rounded w-fit'>
                      {result.word}
                    </p>
                  ))}
                  {seven.length == 0 && <p>No Sevens!</p>}
                </div>
              </div>

              <div className='p-4 bg-blue-100'>
                <p>Results of Six</p>
                <div className='flex flex-wrap gap-4'>
                  {six.map(result => (
                    <p className='px-3 py-2 bg-blue-300 rounded w-fit'>
                      {result.word}
                    </p>
                  ))}
                  {six.length == 0 && <p>No Sixes!</p>}
                </div>
              </div>

              <div className='p-4 bg-blue-100'>
                <p>Results of Five</p>
                <div className='flex flex-wrap gap-4'>
                  {five.map(result => (
                    <p className='px-3 py-2 bg-blue-300 rounded w-fit'>
                      {result.word}
                    </p>
                  ))}

                  {five.length == 0 && <p>No Fives!</p>}
                </div>
              </div>

              <div className='p-4 bg-blue-100'>
                <p>Results of Four</p>
                <div className='flex flex-wrap gap-4'>
                  {four.map(result => (
                    <p className='px-3 py-2 bg-blue-300 rounded w-fit'>
                      {result.word}
                    </p>
                  ))}

                  {four.length == 0 && <p>No Fours!</p>}
                </div>
              </div>

              <div className='p-4 bg-blue-100'>
                <p>Results of Three</p>
                <div className='flex flex-wrap gap-4'>
                  {three.map(result => (
                    <p className='px-3 py-2 bg-blue-300 rounded w-fit'>
                      {result.word}
                    </p>
                  ))}

                  {three.length == 0 && <p>No Threes!</p>}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Results
