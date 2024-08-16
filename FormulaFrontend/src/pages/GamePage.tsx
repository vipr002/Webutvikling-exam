import { FormEvent, useEffect, useState } from "react";
import { useDriver } from "../contexts/DriverContext";
import { getImageUrl } from "../services/Helpers";
const GamePage = () => {
  const { drivers } = useDriver();

  const [score, setScore] = useState(0);
  const [index, setIndex] = useState(
    Math.floor(Math.random() * drivers.length)
  );
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");

  // hver gang drivers endrer seg setter jeg indexen på drivers-array
  // slik at vi kan hente ut tilfeldig bilde til spillet

  useEffect(() => {
    setIndex(Math.floor(Math.random() * drivers.length));
  }, [drivers]);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setAnswer(e.currentTarget.value);
  };

  const checkAnswer = () => {
    if (
      drivers[index].name.toLocaleLowerCase() === answer.toLocaleLowerCase()
    ) {
      setMessage("Correct!");
      setScore(score + 1);
      setIndex(Math.floor(Math.random() * drivers.length));
    } else {
      setMessage(`wrong, the right answer was:  ${drivers[index].name}`);
      setIndex(Math.floor(Math.random() * drivers.length));
    }
  };

  if (drivers.length === 0) {
    return <p>loading...</p>;
  }

  return (
    <>
      <section className="guessGameContainer">
        <h5>Who is this?</h5>
        <img
          src={getImageUrl(drivers[index].image)}
          alt="photograph of a driver to guess"
        />
        <input type="text" onChange={handleChange} />
        <button className="btn btn-primary" onClick={checkAnswer}>
          Submit answer
        </button>
        <p>{message}</p>
        <div>
          <p>score: {score}</p>
          <button onClick={() => setScore(0)} className="btn btn-danger">
            clear
          </button>
        </div>
      </section>
    </>
  );
};

export default GamePage;
