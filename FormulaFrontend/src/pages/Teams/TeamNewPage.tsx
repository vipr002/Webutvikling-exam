import { FormEvent, SyntheticEvent, useState } from "react";
import { useTeam } from "../../contexts/TeamContext";
import { useNavigate } from "react-router-dom";
import ITeam from "../../interfaces/ITeam";

const TeamNewPage = () => {
  const navigate = useNavigate();
  const [team, setTeam] = useState<ITeam>({
    manufacturer: "",
    driver1: "",
    driver2: "",
    image: "",
  });
  const [image, setImage] = useState<null | File>(null);

  const { postTeam } = useTeam();

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    switch (e.currentTarget.name) {
      case "manufacturer":
        setTeam({ ...team, manufacturer: value });
        break;
      case "driver1":
        setTeam({ ...team, driver1: value });

        break;
      case "driver2":
        setTeam({ ...team, driver2: value });

        break;
      case "image":
        const files = e.currentTarget.files;
        if (files === null) break;
        setImage(files[0]);
        setTeam({
          ...team,
          image: files[0].name,
        });
        break;
    }
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (team === null) return;
    if (image === null) return;
    await postTeam(team, image);
    navigate("/teams");
  };

  return (
    <form onSubmit={handleSubmit} className="newForm">
      <label>
        Manufacturer:{" "}
        <input
          type="text"
          name="manufacturer"
          onChange={handleChange}
          className="form-control"
        />
      </label>
      <label>
        Driver1:{" "}
        <input
          type="text"
          name="driver1"
          onChange={handleChange}
          className="form-control"
        />
      </label>
      <label>
        Driver2:{" "}
        <input
          type="text"
          name="driver2"
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
export default TeamNewPage;
