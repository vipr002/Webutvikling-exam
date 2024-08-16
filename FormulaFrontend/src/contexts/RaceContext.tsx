import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import RaceService from "../services/RaceService";
import IRace from "../interfaces/IRace";
import { useError } from "./ErrorContext";

interface IRaceContextType {
  races: IRace[];
  getById: typeof RaceService.getById;
  editRace: typeof RaceService.putRace;
  postRace: typeof RaceService.postRace;
  deleteRace: typeof RaceService.deleteRace;
}

export const RaceContext = createContext<undefined | IRaceContextType>(
  undefined
);

interface IRaceProviderProps {
  children: ReactNode;
}

export const RaceProvider = (props: IRaceProviderProps) => {
  const [races, setRaces] = useState<IRace[]>([]);
  const { showError } = useError();

  useEffect(() => {
    getRacesFromService();
  }, []);

  const getRacesFromService = async () => {
    try {
      const racesFromService = await RaceService.getAll();
      setRaces(racesFromService);
    } catch (err) {
      console.error(err);
      showError(`failed to fetch racers. try to reload`);
    }
  };

  const getById = async (id: number) => {
    const result = await RaceService.getById(id);
    return result;
  };

  const editRace = async (raceToUpdate: IRace) => {
    try {
      await RaceService.putRace(raceToUpdate);
      getRacesFromService();
    } catch (err) {
      console.error(err);
      showError(`failed to edit race`);
    }
  };
  const postRace = async (raceToPost: IRace) => {
    try {
      await RaceService.postRace(raceToPost);
      getRacesFromService();
    } catch (err) {
      console.error(err);
      showError(`failed to post race`);
    }
  };
  const deleteRace = async (id: number) => {
    try {
      await RaceService.deleteRace(id);
      getRacesFromService();
    } catch (err) {
      console.error(err);
      showError(`failed to delete race`);
    }
  };

  return (
    <RaceContext.Provider
      value={{ races, getById, editRace, postRace, deleteRace }}
    >
      {props.children}
    </RaceContext.Provider>
  );
};

export const useRace = () => {
  const context = useContext(RaceContext);

  if (context === undefined) {
    throw new Error("useRace must be used within a RaceProvider");
  }

  return context;
};
