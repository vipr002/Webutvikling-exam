import { Link } from "react-router-dom";
import { getImageUrl } from "../../services/Helpers";

// lokal interface definerer typen på all data driveritem tar inn som props
// f.eks handledelete som funksjon til onClick på delete knappen

interface Props {
  name: string;
  age?: number;
  nationality: string;
  image: string;
  id?: number;
  func: Function;
}

const DriverItem = (props: Props) => {
  const { name, age, nationality, image, id, func } = props;
  return (
    <li key={id} className="card col-sm-12 col-md-6 col-lg-4">
      <h3>{name}</h3>
      <div className="textDiv">
        <p className="cardP1">age: {age}</p>
        <p className="cardP2">nationality: {nationality}</p>
        <p>id: {id}</p>
        <div className="actionContainer">
          <button className="btn btn-danger actionBtn" onClick={() => func(id)}>
            Delete
          </button>
          <Link
            to={`/drivers/edit/${id}`}
            className="btn btn-secondary actionBtn"
          >
            Edit
          </Link>
        </div>
      </div>
      <img src={getImageUrl(image)} alt="photograph of a driver" />
    </li>
  );
};

export default DriverItem;
