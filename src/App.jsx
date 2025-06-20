import { useState } from 'react'

function Square({value, onSquareClick}) {
  return (<button onClick={onSquareClick} className='items-center justify-center border w-12 h-12 p-0 m-0'>{value}</button>);
}

function Board({ xIsNext, squares, onPlay}) {

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();

    if (squares[i]) {
      return;
    }

    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    onPlay(nextSquares);
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for(let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <h1 className="mb-3 text-sm text-neutral-600 font-regular">{status}</h1>
      <div className="flex justify-center items-center">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="flex justify-center items-center">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="flex justify-center items-center">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
    setXIsNext(!xIsNext)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
    setXIsNext(nextMove % 2 === 0)
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={move} className=''>
        <button className='w-full text-left cursor-pointer my-2 bg-neutral-800 rounded-lg py-2 px-3.5' onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
    })

  return (
    <>
      <div className="h-screen flex flex-row justify-center items-center text-neutral-100 bg-neutral-900">
        <div className="mx-10 ">
          <h1 className="flex mb-6 text-3xl font-bold text-center">Tic Tac Toe</h1>
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
          <ol>{moves}</ol>
      </div>
    </>
  );
}

export default App;