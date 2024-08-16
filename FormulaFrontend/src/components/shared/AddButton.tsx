import { Link } from "react-router-dom";
import { FC } from "react";
import { Plus } from "react-bootstrap-icons";

// Bruker Functional Component til å definere argumentet target som string
// Bruker target til å bestemme hvor linken fører til å lage nytt objekt av typen
// target bestemmer

const AddButton: FC<{ target: string }> = ({ target }) => {
  return (
    <div className="btnComponent">
      <Link to={`/${target}/new`}>
        <Plus size={60} color="white" />
      </Link>
    </div>
  );
};
export default AddButton;
