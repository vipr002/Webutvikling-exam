import { Link } from "react-router-dom";
import { getImageUrl } from "../../services/Helpers";
interface Props {
  manufacturer: string;
  driver1: string;
  driver2: string;
  image: string;
  id?: number;
  func: Function;
}

const TeamItem = (props: Props) => {
  const { manufacturer, driver1, driver2, image, id, func } = props;
  return (
    <li key={id} className="card col-sm-12 col-md-6 col-lg-4">
      <h3>{manufacturer}</h3>
      <div className="textDiv">
        <p className="cardP1">Driver 1: {driver1}</p>
        <p className="cardP2">Driver 2: {driver2}</p>
        <p>id: {id}</p>
        <div className="actionContainer">
          <button className="btn btn-danger actionBtn" onClick={() => func(id)}>
            Delete
          </button>
          <Link
            to={`/teams/edit/${id}`}
            className="btn btn-secondary actionBtn"
          >
            Edit
          </Link>
        </div>
      </div>
      <img
        src={getImageUrl(image)}
        alt="photograph of a car belonging to a team"
      />
    </li>
  );
};

export default TeamItem;
