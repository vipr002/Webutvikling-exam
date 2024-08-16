import { useDriver } from "../../contexts/DriverContext";
import AddButton from "../../components/shared/AddButton";
import DriverItem from "../../components/Drivers/DriverItem";
import { Link } from "react-router-dom";
import { Search } from "react-bootstrap-icons";
const DriverListPage = () => {
  const { drivers, deleteDriver } = useDriver();
  const handleDelete = async (id: number) => {
    deleteDriver(id);
  };
  return (
    <>
      <AddButton target={"drivers"} />
      <div className="btnComponent">
        <Link to="/drivers/search">
          <Search color="white" size="30" />
        </Link>
      </div>
      <div className="container">
        <ul className="row">
          {drivers.map((driver) => (
            <DriverItem
              key={driver.id}
              id={driver.id}
              name={driver.name}
              age={driver.age}
              nationality={driver.nationality}
              image={driver.image}
              func={handleDelete}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default DriverListPage;
