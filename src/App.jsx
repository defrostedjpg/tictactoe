import { useState } from 'react'

  function Square({value, onSquareClick}) {
    return (<button onClick={onSquareClick} className='items-center justify-center border w-12 h-12 p-0 m-0'>{value}</button>);
  }

function App() {
  const[squares, setSquares] = useState(Array(9).fill(null))

  function handleClick(i) {
    const nextSquares = squares.slice()
    nextSquares[i] = 'X'
    setSquares(nextSquares)
  }

  return (
    <>
      <div className='h-screen flex flex-col justify-center items-center text-neutral-100 bg-neutral-900'>
        <h1 className='my-6 text-3xl font-bold'>Tic Tac Toe</h1>

        <div className='flex justify-center items-center'>
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className='flex justify-center items-center'>
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className='flex justify-center items-center'>
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </>
  )
}

export default App;