import axios from "axios";
import ITeam from "../interfaces/ITeam";
import { getUrl } from "./Helpers";

const TeamService = (() => {
  const getAll = async () => {
    const result = await axios.get<ITeam[]>(getUrl("Team"));
    if (result.status >= 400) {
      throw new Error(`get returned unexpected status: ${result.status}`);
    }
    return result.data;
  };

  const getById = async (id: number) => {
    const result = await axios.get<ITeam | null>(`${getUrl("Team")}/${id}`);
    if (result.status >= 400) {
      throw new Error(`get returned unexpected status: ${result.status}`);
    }
    return result.data;
  };

  const postTeam = async (newTeam: ITeam, image: File) => {
    const result = await axios.post(getUrl("Team"), newTeam);

    if (result.status >= 400) {
      throw new Error(`Post returned unexpected status ${result.status}`);
    }

    const formData = new FormData();
    formData.append("formFile", image);

    const uploadResult = await axios({
      url: getUrl("ImageUpload"),
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (uploadResult.status >= 400) {
      throw new Error(
        `Image Post returned unexpected status ${uploadResult.status}`
      );
    }

    formData.delete("formFile");
  };

  const putTeam = async (teamToUpdate: ITeam) => {
    const result = await axios.put(getUrl("Team"), teamToUpdate);
    if (result.status >= 400) {
      throw new Error(
        `Put / Edit team returned unexpected status: ${result.status}`
      );
    }
  };
  const deleteTeam = async (id: number) => {
    const result = await axios.delete<void>(`${getUrl("Team")}/${id}`);
    if (result.status >= 400) {
      throw new Error(`Delete returned unexpected status: ${result.status}`);
    }
  };

  return {
    getAll,
    getById,
    postTeam,
    putTeam,
    deleteTeam,
  };
})();

export default TeamService;
