import { Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import "./style.scss";
import { alertActions } from "redux/alert/alert.slice";

// Alert severity = [error, warning, info, success]

const Alerts = () => {
  const alerts = useSelector((state) => state.alert.alerts);
  const dispatch = useDispatch();

  return (
    <div className="Alerts">
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          className="alert shake-animation"
          severity={alert.type}
          onClose={() => {
            dispatch(alertActions.deleteAlert(alert.id));
          }}
        >
          {alert.title?.message ?? alert.title}
        </Alert>
      ))}
    </div>
  );
};

export default Alerts;
