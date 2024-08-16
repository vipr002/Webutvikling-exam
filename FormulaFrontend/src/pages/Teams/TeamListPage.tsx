import { useTeam } from "../../contexts/TeamContext";
import AddButton from "../../components/shared/AddButton";
import TeamItem from "../../components/Teams/TeamItem";

const TeamListPage = () => {
  const { teams, deleteTeam } = useTeam();

  const handleDelete = async (id: number) => {
    deleteTeam(id);
  };

  return (
    <>
      <AddButton target={"teams"} />
      <section className="container">
        <ul className="row">
          {teams.map((team) => (
            <TeamItem
              key={team.id}
              id={team.id}
              manufacturer={team.manufacturer}
              driver1={team.driver1}
              driver2={team.driver2}
              image={team.image}
              func={handleDelete}
            />
          ))}
        </ul>
      </section>
    </>
  );
};
export default TeamListPage;
