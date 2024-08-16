import { useError } from "../../contexts/ErrorContext";

// komponent for å vise errormelding i MainNavigation komponenten
const ErrorToast = () => {
  const { _error } = useError();

  if (_error) {
    return <p>{_error}</p>;
  }

  return null;
};

export default ErrorToast;
