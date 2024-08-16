import { useDriver } from "../../contexts/DriverContext";
import DriverItem from "../../components/Drivers/DriverItem";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Arrow90degLeft } from "react-bootstrap-icons";
export const DriverSearchPage = () => {
  const { deleteDriver, getByName } = useDriver();
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [driver, setDriver] = useState([
    { name: "", nationality: "", image: "", id: 0, age: 0 },
  ]);

  const handleDelete = async (id) => {
    deleteDriver(id);
  };

  // useEffect for å "auto-capitalize" keyword hver gang det skjer en endring /
  // hver gang man skriver i inputen
  // https://www.codingbeautydev.com/blog/react-capitalize-first-letter-of-each-word

  useEffect(() => {
    setKeyword(
      keyword
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
  }, [keyword]);

  const getDriverByNameFromContext = async (keyword) => {
    if (keyword === "") return;
    console.log(keyword);
    const result = await getByName(keyword);
    if (result.length === 0) {
      setLoading(true);
      return;
    }
    setLoading(false);
    setDriver(result[0]);
  };

  const handleChange = (e) => {
    setKeyword(e.currentTarget.value);
  };

  return (
    <>
      {loading ? (
        <>
          <div className="btnComponent">
            <Link to="/drivers">
              <Arrow90degLeft color="white" size="25" />
            </Link>
          </div>
          <input type="text" onChange={handleChange} value={keyword} />
          <button
            className="btn btn-outline-secondary"
            onClick={() => getDriverByNameFromContext(keyword)}
          >
            submit
          </button>
        </>
      ) : (
        <>
          <div className="btnComponent">
            <Link to="/drivers">
              <Arrow90degLeft color="white" size="25" />
            </Link>
          </div>
          <input
            type="text"
            onChange={handleChange}
            value={keyword}
            placeholder="auto-capitalizes"
          />
          <button
            className="btn btn-outline-secondary"
            onClick={() => getDriverByNameFromContext(keyword)}
          >
            submit
          </button>
          <div className="container">
            <ul className="row">
              <DriverItem
                key={driver.id}
                id={driver.id}
                name={driver.name}
                age={driver.age}
                nationality={driver.nationality}
                image={driver.image}
                func={handleDelete}
              />
            </ul>
          </div>
        </>
      )}
    </>
  );
};
