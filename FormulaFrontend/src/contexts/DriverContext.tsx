import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import DriverService from "../services/DriverService";
import IDriver from "../interfaces/IDriver";
import { useError } from "./ErrorContext";

// lager et interface for hvordan contexten skal se ut. Siden contexten returnerer
// funksjoner fra servicen. For å slippe å beskrive hver enkelt funksjon
interface IDriverContextType {
  drivers: IDriver[];
  getById: typeof DriverService.getById;
  getByName: typeof DriverService.getByName;
  editDriver: typeof DriverService.putDriver;
  postDriver: typeof DriverService.postDriver;
  deleteDriver: typeof DriverService.deleteDriver;
}

export const DriverContext = createContext<undefined | IDriverContextType>(
  undefined
);

// definerer interface til children av alle properties av provider

interface IDriverProviderProps {
  children: ReactNode;
}

export const DriverProvider = (props: IDriverProviderProps) => {
  const [drivers, setDrivers] = useState<IDriver[]>([]);
  const { showError } = useError();

  useEffect(() => {
    getDriversFromService();
  }, []);

  const getDriversFromService = async () => {
    // try catch i her istedet for i servicen
    // ettersom funksjonene i servicen returnerer ulike verdier
    // og skaper problemer med TypeScript
    try {
      const driverFromService = await DriverService.getAll();
      setDrivers(driverFromService);
    } catch (err) {
      // sender errormelding til konsollen og viser errortoast til brukeren
      console.error(err);
      showError(`failed to fetch drivers. try to reload`);
    }
  };

  const getById = async (id: number) => {
    const result = await DriverService.getById(id);
    return result;
  };

  const getByName = async (name: string) => {
    const result = await DriverService.getByName(name);
    return result;
  };

  const editDriver = async (driverToUpdate: IDriver) => {
    try {
      await DriverService.putDriver(driverToUpdate);
      getDriversFromService();
    } catch (err) {
      console.error(err);
      showError(`failed to edit driver`);
    }
  };
  const postDriver = async (driverToPost: IDriver, image: File) => {
    try {
      await DriverService.postDriver(driverToPost, image);
      getDriversFromService();
    } catch (err) {
      console.error(err);
      showError(`failed to post driver.`);
    }
  };
  const deleteDriver = async (id: number) => {
    try {
      await DriverService.deleteDriver(id);
      getDriversFromService();
    } catch (err) {
      console.error(err);
      showError(`failed to delete driver`);
    }
  };

  return (
    <DriverContext.Provider
      value={{
        drivers,
        getById,
        editDriver,
        postDriver,
        deleteDriver,
        getByName,
      }}
    >
      {props.children}
    </DriverContext.Provider>
  );
};

// link for å gjøre det enklere å bruke contexten
// exporter en funksjon for å "useContext"
// https://kentcdodds.com/blog/how-to-use-react-context-effectively

export const useDriver = () => {
  const context = useContext(DriverContext);

  // ny error dersom useDriver brukes uttafor DriverProvidern
  if (context === undefined) {
    throw new Error("useDriver must be used within a DriverProvider");
  }

  return context;
};
