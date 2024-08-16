import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { DriverProvider } from "./contexts/DriverContext";
import { TeamProvider } from "./contexts/TeamContext";
import { ErrorProvider } from "./contexts/ErrorContext";
import { RaceProvider } from "./contexts/RaceContext";
import MainNavigation from "./components/shared/MainNavigation";
import GamePage from "./pages/GamePage";
import ListDrivers from "./pages/Drivers/DriverListPage";
import EditDriver from "./pages/Drivers/DriverEditPage";
import NewDriver from "./pages/Drivers/DriverNewPage";
import ListTeams from "./pages/Teams/TeamListPage";
import EditTeam from "./pages/Teams/TeamEditPage";
import NewTeam from "./pages/Teams/TeamNewPage";
import ListRaces from "./pages/Races/RaceListPage";
import EditRace from "./pages/Races/RaceEditPage";
import NewRace from "./pages/Races/RaceNewPage";
import { DriverSearchPage } from "./pages/Drivers/DriverSearchPage";
const App = () => {
  return (
    <>
      <ErrorProvider>
        <DriverProvider>
          <TeamProvider>
            <RaceProvider>
              <BrowserRouter>
                <MainNavigation />

                <main>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="drivers" element={<ListDrivers />} />
                    <Route path="drivers/edit/:id" element={<EditDriver />} />
                    <Route path="drivers/new" element={<NewDriver />} />
                    <Route path="teams" element={<ListTeams />} />
                    <Route path="teams/edit/:id" element={<EditTeam />} />
                    <Route path="teams/new" element={<NewTeam />} />
                    <Route path="races" element={<ListRaces />} />
                    <Route path="races/edit/:id" element={<EditRace />} />
                    <Route path="races/new" element={<NewRace />} />
                    <Route path="game" element={<GamePage />} />
                    <Route
                      path="drivers/search"
                      element={<DriverSearchPage />}
                    />
                  </Routes>
                </main>
              </BrowserRouter>
            </RaceProvider>
          </TeamProvider>
        </DriverProvider>
      </ErrorProvider>
    </>
  );
};

export default App;
