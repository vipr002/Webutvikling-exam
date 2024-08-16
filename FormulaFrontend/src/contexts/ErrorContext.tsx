import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";

interface IErrorContext {
  showError: (value: string) => void;
  _error: string;
}

const ErrorContext = createContext<IErrorContext | undefined>(undefined);

interface IErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider = (props: IErrorProviderProps) => {
  const [error, setError] = useState("");
  const [timer, setTimer] = useState<number | undefined>(undefined);

  const showError = (errorMessage: string) => {
    clearTimeout(timer);
    setError(errorMessage);
    setTimer(
      setTimeout(() => {
        setError("");
      }, 5000)
    );
  };

  return (
    <ErrorContext.Provider value={{ showError, _error: error }}>
      {props.children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);

  if (context === undefined) {
    throw new Error("useError must be used within a ErrorProvider");
  }

  return context;
};
