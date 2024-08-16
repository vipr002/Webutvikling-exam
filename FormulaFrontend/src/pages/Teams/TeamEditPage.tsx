import { useNavigate, useParams } from "react-router-dom";
import { useTeam } from "../../contexts/TeamContext";
import { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import ITeam from "../../interfaces/ITeam";

const TeamEditPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const { getById, editTeam } = useTeam();
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState<ITeam | null>(null);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    if (team === null) return;
    const { value } = e.currentTarget;

    switch (e.currentTarget.name) {
      case "manufacturer":
        setTeam({ ...team, manufacturer: value });
        break;
      case "driver1":
        setTeam({ ...team, driver1: value });
        break;
      case "driver2":
        setTeam({ ...team, driver2: value });
        break;
    }
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (team === null) return;
    await editTeam(team);
    navigate("/teams");
  };

  useEffect(() => {
    getById(Number(id)).then((team) => {
      setTeam(team);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!team) {
    return <p>Team not found</p>;
  }

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit} className="editForm">
        <input
          onChange={handleChange}
          name="manufacturer"
          type="text"
          value={team.manufacturer}
        />
        <input
          onChange={handleChange}
          name="driver1"
          type="text"
          value={team.driver1}
        />
        <input
          onChange={handleChange}
          name="driver2"
          type="text"
          value={team.driver2}
        />
        <button type="submit" className="btn btn-outline-dark">
          Save Changes
        </button>
      </form>
    </div>
  );
};
export default TeamEditPage;
