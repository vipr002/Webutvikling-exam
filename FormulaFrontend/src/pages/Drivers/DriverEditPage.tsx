import { useNavigate, useParams } from "react-router-dom";
import { useDriver } from "../../contexts/DriverContext";
import { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import IDriver from "../../interfaces/IDriver";
const DriverEditPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const { getById, editDriver } = useDriver();
  const [loading, setLoading] = useState(true);
  const [driver, setDriver] = useState<IDriver | null>(null);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    if (driver === null) return;
    const { value } = e.currentTarget;

    switch (e.currentTarget.name) {
      case "name":
        setDriver({ ...driver, name: value });
        break;
      case "age":
        setDriver({ ...driver, age: Number(value) });
        break;
      case "nationality":
        setDriver({ ...driver, nationality: value });
        break;
    }
  };

  // bruker syntheticevent siden vi i dette tilfellet ikke bryr oss hva eventet er
  // prevent default forhindrer nettleseren i å gjøre det som er standard.
  // i dette tilfellet å refreshe siden

  const handleSumbit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (driver === null) return;
    await editDriver(driver);
    // fra react-router-dom. navigerer til /drivers
    navigate("/drivers");
  };

  useEffect(() => {
    getById(Number(id)).then((driver) => {
      setDriver(driver);
      setLoading(false);
    });
  }, []);

  // stopper dersom driver fortsatt er loading eller ikke funnet

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!driver) {
    return <p>Driver not found</p>;
  }

  return (
    <div className="formContainer">
      <form onSubmit={handleSumbit} className="editForm">
        <input
          onChange={handleChange}
          name="name"
          type="text"
          value={driver.name}
        />
        <input
          onChange={handleChange}
          name="age"
          type="text"
          value={driver.age}
        />
        <input
          onChange={handleChange}
          name="nationality"
          type="text"
          value={driver.nationality}
        />
        <button type="submit" className="btn btn-outline-dark">
          Save Changes
        </button>
      </form>
    </div>
  );
};
export default DriverEditPage;
