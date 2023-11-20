import React from "react";
import { formatPhone } from "utils/formatPhone";

const Phone = ({ phone }) => {
  return <div>{formatPhone(phone)}</div>;
};

export default Phone;
