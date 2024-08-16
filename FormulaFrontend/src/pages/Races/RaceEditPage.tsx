import { useNavigate, useParams } from "react-router-dom";
import { useRace } from "../../contexts/RaceContext";
import { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import IRace from "../../interfaces/IRace";

const RaceEditPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const { getById, editRace } = useRace();
  const [loading, setLoading] = useState(true);
  const [race, setRace] = useState<IRace | null>(null);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    if (race === null) return;
    const { value } = e.currentTarget;

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
        setRace({ ...race, numberOfLaps: Number(value) });
        break;
    }
  };

  const handleSumbit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (race === null) return;
    await editRace(race);
    navigate("/races");
  };

  useEffect(() => {
    getById(Number(id)).then((race) => {
      setRace(race);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!race) {
    return <p>Race not found</p>;
  }

  return (
    <div className="formContainer">
      <form onSubmit={handleSumbit} className="editForm">
        <input
          onChange={handleChange}
          name="grandPrix"
          type="text"
          value={race.grandPrix}
        />
        <input
          onChange={handleChange}
          name="winnerName"
          type="text"
          value={race.winnerName}
        />
        <input
          onChange={handleChange}
          name="winnerTime"
          type="number"
          value={race.winnerTime}
        />
        <input
          onChange={handleChange}
          name="numberOfLaps"
          type="number"
          value={race.numberOfLaps}
        />
        <button type="submit" className="btn btn-outline-dark">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default RaceEditPage;
