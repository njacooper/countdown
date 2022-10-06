import { Link, useLocation } from 'react-router-dom'

function Navigation () {
  //get the path
  const location = useLocation()

  return (
    <>
      <div className='sticky top-0 bg-[#053259] z-50 flex justify-center w-screen py-1 shadow-sm h-16'>
        <div className='w-full flex justify-center font-bold'>
          <nav className='navigation flex py-4'>
            <ul className='justify-around flex h-full items-center gap-10 text-white'>
              <li className={location.pathname == '/' ? 'activePage' : ''}>
                <Link to='/'>Game</Link>
                {location.pathname == '/' && <div className='active'></div>}
              </li>
              <li
                className={location.pathname == '/manual' ? 'activePage' : ''}
              >
                <Link to='/manual'>Manual Letters</Link>
                {location.pathname == '/manual' && (
                  <div className='active'></div>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Navigation
