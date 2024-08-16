import { FormEvent, SyntheticEvent, useState } from "react";
import IDriver from "../../interfaces/IDriver";
import { useDriver } from "../../contexts/DriverContext";
import { useNavigate } from "react-router-dom";

const DriverNewPage = () => {
  const navigate = useNavigate();
  const [driver, setDriver] = useState<IDriver>({
    name: "",
    image: "",
    nationality: "",
  });
  const [image, setImage] = useState<null | File>(null);

  const { postDriver } = useDriver();

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    switch (e.currentTarget.name) {
      case "name":
        setDriver({ ...driver, name: value });
        break;
      case "age":
        setDriver({ ...driver, age: Number(value) });
        break;
      case "nationality":
        setDriver({
          ...driver,
          nationality: value,
        });
        break;
      case "image":
        const files = e.currentTarget.files;
        if (files === null) break;
        setImage(files[0]);
        setDriver({
          ...driver,
          image: files[0].name,
        });
        break;
    }
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(driver);
    if (driver === null) return;
    console.log(image);

    if (image === null) return;
    console.log(driver, image);
    await postDriver(driver, image);
    navigate("/drivers");
  };
  // Bootstrap forms
  // https://getbootstrap.com/docs/5.0/forms/overview/
  return (
    <form onSubmit={handleSubmit} className="newForm">
      <label>
        Name:{" "}
        <input
          type="text"
          name="name"
          onChange={handleChange}
          className="form-control"
        />
      </label>
      <label>
        Age:{" "}
        <input
          type="number"
          name="age"
          onChange={handleChange}
          className="form-control"
        />
      </label>
      <label>
        Nationality:{" "}
        <input
          type="text"
          name="nationality"
          onChange={handleChange}
          className="form-control"
        />
      </label>
      <label>
        Image:{" "}
        <input
          name="image"
          type="file"
          onChange={handleChange}
          className="form-control"
        />
      </label>
      <button className="btn btn-outline-dark" type="submit">
        Submit
      </button>
    </form>
  );
};

export default DriverNewPage;
