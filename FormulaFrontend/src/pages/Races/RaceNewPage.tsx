import { FormEvent, SyntheticEvent, useState } from "react";
import IRace from "../../interfaces/IRace";
import { useRace } from "../../contexts/RaceContext";
import { useNavigate } from "react-router-dom";

const RaceNewPage = () => {
  const navigate = useNavigate();
  const [race, setRace] = useState<IRace>({
    grandPrix: "",
    winnerName: "",
    numberOfLaps: 0,
    winnerTime: 0,
  });

  const { postRace } = useRace();

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    switch (e.currentTarget.name) {
      case "grandPrix":
        setRace({ ...race, grandPrix: value });
        break;
      case "winnerName":
        setRace({ ...race, winnerName: value });

        break;
      case "winnerTime":
        setRace({ ...race, winnerTime: Number(value) });

        break;
      case "numberOfLaps":
        setRace({
          ...race,
          numberOfLaps: Number(value),
        });
        break;
    }
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(race);
    if (race === null) return;
    await postRace(race);
    navigate("/races");
  };

  return (
    <form onSubmit={handleSubmit} className="newForm">
      <label>
        GrandPrix:{" "}
        <input
          type="text"
          name="grandPrix"
          onChange={handleChange}
          className="form-control"
        />
      </label>
      <label>
        Winner Name:{" "}
        <input
          type="text"
          name="winnerName"
          onChange={handleChange}
          className="form-control"
        />
      </label>
      <label>
        Winner Time:{" "}
        <input
          type="number"
          step="0.01"
          name="winnerTime"
          onChange={handleChange}
          className="form-control"
        />
      </label>
      <label>
        Number Of Laps:{" "}
        <input
          type="number"
          name="numberOfLaps"
          onChange={handleChange}
          className="form-control"
        />
      </label>
      <button className="btn btn-outline-dark" type="submit">
        Submit
      </button>
    </form>
  );
};
export default RaceNewPage;
