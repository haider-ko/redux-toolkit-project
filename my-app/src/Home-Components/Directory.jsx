import React, { useState, useEffect } from "react";
import "antd/dist/antd.min.css"; // or 'antd/dist/antd.less'
import NavbarHome from "./navbar";
import { useSelector } from "react-redux";
import { selectUser } from "../features/counter/userSlice";
import { stringify } from "rc-field-form/es/useWatch";

function Directory() {
  const users = useSelector(selectUser);

  return (
    <>
      <NavbarHome name={users.firstname} />
    </>
  );
}

export default Directory;
