import axios from "axios";
import { getUrl } from "./Helpers";
import IRace from "../interfaces/IRace";

const RaceService = (() => {
  const getAll = async () => {
    const result = await axios.get<IRace[]>(getUrl("Race"));
    if (result.status >= 400) {
      throw new Error(`get returned unexpected status: ${result.status}`);
    }
    return result.data;
  };

  const getById = async (id: number) => {
    const result = await axios.get<IRace | null>(`${getUrl("Race")}/${id}`);
    if (result.status >= 400) {
      throw new Error(`get returned unexpected status: ${result.status}`);
    }
    return result.data;
  };

  const postRace = async (newRace: IRace) => {
    const result = await axios.post(getUrl("Race"), newRace);

    if (result.status >= 400) {
      throw new Error(`Post returned unexpected status ${result.status}`);
    }
  };

  const putRace = async (raceToUpdate: IRace) => {
    const result = await axios.put(getUrl("Race"), raceToUpdate);
    if (result.status >= 400) {
      throw new Error(`Post returned unexpected status ${result.status}`);
    }
  };
  const deleteRace = async (id: number) => {
    const result = await axios.delete<void>(`${getUrl("Race")}/${id}`);
    if (result.status >= 400) {
      throw new Error(`Delete returned unexpected status: ${result.status}`);
    }
  };

  return {
    getAll,
    getById,
    postRace,
    putRace,
    deleteRace,
  };
})();

export default RaceService;
