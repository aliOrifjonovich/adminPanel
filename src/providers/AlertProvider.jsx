import Alerts from "Components/Alerts";

const AlertProvider = ({ children }) => {
  return (
    <>
      <Alerts />
      {children}
    </>
  );
};

export default AlertProvider;
