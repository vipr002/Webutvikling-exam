import { Link } from "react-router-dom";

interface Props {
  id?: number;
  i: number;
  grandPrix: string;
  winnerName: string;
  winnerTime: number;
  numberOfLaps: number;
  func: Function;
}

const RaceItem = (props: Props) => {
  const { grandPrix, winnerName, winnerTime, numberOfLaps, id, i, func } =
    props;
  return (
    <tr key={id} className="">
      <th scope="row">{i + 1}</th>
      <td>{grandPrix}</td>
      <td>{winnerName}</td>
      <td>{winnerTime}</td>
      <td>{numberOfLaps}</td>
      <td>
        <button className="btn btn-danger raceBtn" onClick={() => func(id)}>
          Delete
        </button>
      </td>
      <td>
        <Link to={`/races/edit/${id}`} className="btn btn-secondary raceBtn">
          Edit
        </Link>
      </td>
    </tr>
  );
};

export default RaceItem;
