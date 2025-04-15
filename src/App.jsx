import { useState, useRef, useEffect } from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0
  })
  const [rolls, setRolls] = useState(0)
  const [dice, setDice] = useState(() => generateAllNewDice())
  const buttonRef = useRef(null)
  const intervalRef = useRef(null)

  const gameWon = dice.every(die => die.isHeld) &&
    dice.every(die => die.value === dice[0].value)

  useEffect(() => {
    if (gameWon) {
      stopTimer()
      buttonRef.current.focus()
    } else {
      startTimer()
    }
  }, [gameWon])

  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map(() => ({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }))
  }

  function rollDice() {
    setRolls(prevRolls => prevRolls + 1)
    if (!gameWon) {
      setDice(oldDice => oldDice.map(die =>
        die.isHeld ?
          die :
          { ...die, value: Math.ceil(Math.random() * 6) }
      ))
    } else {
      setDice(generateAllNewDice())
      setRolls(0)
      setTime({
        seconds: 0,
        minutes: 0
      })
    }
  }

  function hold(id) {
    setDice(oldDice => oldDice.map(die =>
      die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    ))
  }

  const diceElements = dice.map(dieObj => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)}
    />
  ))

  function startTimer() {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => ({
          seconds: prevTime.seconds === 59 ? 0 : prevTime.seconds + 1,
          minutes: prevTime.seconds === 59 ? prevTime.minutes + 1 : prevTime.minutes
        }))
      }, 1000)
    }
  }


  function stopTimer() {
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }

  return (
    <main>
      <div className="game-container">
        {gameWon && <Confetti />}
        <div aria-live="polite" className="sr-only">
          {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
        </div>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {diceElements}
        </div>
        <button ref={buttonRef} className="roll-dice" onClick={rollDice}>
          {gameWon ? "New Game" : "Roll"}
        </button>
        <div className="bottom-section">
          <span>
            {time.minutes < 10 ? "0" : null}{time.minutes} : {time.seconds < 10 ? "0" : null}{time.seconds}
          </span>
          <span>Rolls: {rolls}</span>
        </div>
      </div>
    </main>
  )
}