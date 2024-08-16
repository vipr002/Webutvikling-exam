import { useRace } from "../../contexts/RaceContext";
import AddButton from "../../components/shared/AddButton";
import RaceItem from "../../components/Races/RaceItem";

const RaceListPage = () => {
  const { races, deleteRace } = useRace();

  const handleDelete = async (id: number) => {
    deleteRace(id);
  };

  return (
    <>
      <AddButton target={"races"} />
      <section className="raceBody">
        {/* Bootstrap table: https://getbootstrap.com/docs/4.1/content/tables/ */}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Grand Prix</th>
              <th scope="col">Winner Name</th>
              <th scope="col">Winner Time</th>
              <th scope="col">Numer of Laps</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {races.map((race, i) => (
              <RaceItem
                key={i}
                i={i}
                grandPrix={race.grandPrix}
                winnerName={race.winnerName}
                winnerTime={race.winnerTime}
                id={race.id}
                numberOfLaps={race.numberOfLaps}
                func={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};
export default RaceListPage;
