import axios from "axios";
import IDriver from "../interfaces/IDriver";
import { getUrl } from "./Helpers";

// bruker status på resultat-objektet vi får tilbake fra APIet og thrower en error
// dersom errorkoden er 400 eller større

const DriverService = (() => {
  const getAll = async () => {
    const result = await axios.get<IDriver[]>(getUrl("Driver"));
    if (result.status >= 400) {
      throw new Error(`get returned unexpected status: ${result.status}`);
    }
    return result.data;
  };

  const getById = async (id: number) => {
    const result = await axios.get<IDriver | null>(`${getUrl("Driver")}/${id}`);
    if (result.status >= 400) {
      throw new Error(`get returned unexpected status: ${result.status}`);
    }
    return result.data;
  };

  const getByName = async (name: string) => {
    const result = await axios.get<IDriver | null>(
      `${getUrl("Driver")}/GetDriverByName/${name}`
    );
    if (result.status >= 400) {
      throw new Error(`get returned unexpected status: ${result.status}`);
    }
    return result.data;
  };

  const postDriver = async (newDriver: IDriver, image: File) => {
    const result = await axios.post(getUrl("Driver"), newDriver);

    if (result.status >= 400) {
      throw new Error(`Post returned unexpected status: ${result.status}`);
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
        `Image Post returned unexpected status: ${uploadResult.status}`
      );
    }

    formData.delete("formFile");
  };

  const putDriver = async (driverToUpdate: IDriver) => {
    const result = await axios.put(getUrl("Driver"), driverToUpdate);
    if (result.status >= 400) {
      throw new Error(
        `Put / Edit driver returned unexpected status: ${result.status}`
      );
    }
  };
  const deleteDriver = async (id: number) => {
    const result = await axios.delete<void>(`${getUrl("Driver")}/${id}`);
    if (result.status >= 400) {
      throw new Error(`Delete returned unexpected status: ${result.status}`);
    }
  };

  return {
    getAll,
    getById,
    getByName,
    postDriver,
    putDriver,
    deleteDriver,
  };
})();

export default DriverService;
