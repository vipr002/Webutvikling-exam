import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import TeamService from "../services/TeamService";
import ITeam from "../interfaces/ITeam";
import { useError } from "./ErrorContext";

interface ITeamContextType {
  teams: ITeam[];
  getById: typeof TeamService.getById;
  editTeam: typeof TeamService.putTeam;
  postTeam: typeof TeamService.postTeam;
  deleteTeam: typeof TeamService.deleteTeam;
}

export const TeamContext = createContext<undefined | ITeamContextType>(
  undefined
);

interface ITeamContextProps {
  children: ReactNode;
}

export const TeamProvider = (props: ITeamContextProps) => {
  const [teams, setTeams] = useState<ITeam[]>([]);
  const { showError } = useError();

  useEffect(() => {
    getTeamsFromService();
  }, []);

  const getTeamsFromService = async () => {
    try {
      const teamFromService = await TeamService.getAll();
      setTeams(teamFromService);
    } catch (err) {
      console.error(err);
      showError(`failed to fetch teams. try to reload`);
    }
  };

  const getById = async (id: number) => {
    const result = await TeamService.getById(id);
    return result;
  };

  const editTeam = async (teamToUpdate: ITeam) => {
    try {
      await TeamService.putTeam(teamToUpdate);
      getTeamsFromService();
    } catch (err) {
      console.error(err);
      showError(`failed to edit team`);
    }
  };
  const postTeam = async (teamToPost: ITeam, image: File) => {
    try {
      await TeamService.postTeam(teamToPost, image);
      getTeamsFromService();
    } catch (err) {
      console.error(err);
      showError(`failed to post team`);
    }
  };
  const deleteTeam = async (id: number) => {
    try {
      await TeamService.deleteTeam(id);
      getTeamsFromService();
    } catch (err) {
      console.error(err);
      showError(`failed to delete team`);
    }
  };

  return (
    <TeamContext.Provider
      value={{ teams, getById, editTeam, postTeam, deleteTeam }}
    >
      {props.children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  const context = useContext(TeamContext);

  if (context === undefined) {
    throw new Error("useTeam must be used within a TeamProvider");
  }

  return context;
};
