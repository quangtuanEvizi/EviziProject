import React, { useState } from "react";
import "./Sidebar.scss";
import { Link, useHistory, useLocation } from "react-router-dom";
import ContentWrapper from "../componentWrapper/ContentWrapper";
import {
  HIGHEST_ROLE,
  MANAGER_ROLE,
  STORAGE_TOKEN,
  USER_ROLE,
} from "../../utils/constant";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { LocalStorage } from "../../utils/localStorage";
import { cookies } from "exercise/Ex4_project/api/axios";
const permissions = [
  {
    security: HIGHEST_ROLE,
    role: [
      {
        name: "Companies",
        path: "/dashboard/companies",
      },
      {
        name: "Regions",
        path: "/dashboard/regions",
      },
      {
        name: "Locations",
        path: "/dashboard/locations",
      },
    ],
  },
  {
    security: MANAGER_ROLE,
    role: [
      {
        name: "Regions",
        path: "/dashboard/regions",
      },
      {
        name: "Locations",
        path: "/dashboard/locations",
      },
    ],
  },
  {
    security: USER_ROLE,
    role: [],
  },
];
const Sidebar: React.FC<any> = ({ component }) => {
  const history = useHistory();
  const location = useLocation();

  const handleLogout = () => {
    LocalStorage.remove(STORAGE_TOKEN);
    cookies.remove(STORAGE_TOKEN);
    LocalStorage.remove("userId");
    cookies.remove("userId");
    history.go(0);
  };
  const userInfo = useSelector((state: any) => state?.user.userInfor);
  const [isModelOpen, setModelOpen] = useState(false);
  return (
    <div className="layout">
      <div className="sidebar">
        <div className="logo">
          <img
            src="http://192.168.1.189:13030/7a118e128cc5c737471c73f087afdbc9.png"
            alt=""
          />
        </div>
        <div className="sidebar-list">
          <ul>
            <li
              className={
                location.pathname === "/dashboard/inspections" ? "active" : ""
              }
            >
              <Link to="/dashboard/inspections">
                <span>Inspections</span>
              </Link>
            </li>
            {permissions
              .find((item) =>
                item.security.includes(userInfo?.data?.data?.user?.role)
              )
              ?.role.map((permission, i) => {
                return (
                  <li
                    key={i}
                    className={
                      location.pathname === `${permission?.path}`
                        ? "active"
                        : ""
                    }
                  >
                    <Link to={`${permission?.path}`}>
                      <span>{permission.name}</span>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
        {isModelOpen && (
          <div className="modal">
            <button onClick={() => handleLogout()}>Log Out</button>
          </div>
        )}
        <div className="user-infor">
          <div className="infor" onClick={() => setModelOpen(!isModelOpen)}>
            <Avatar className="avatar">
              {userInfo?.data?.data?.user?.firstName.charAt(0)}
              {userInfo?.data?.data?.user?.lastName.charAt(0)}
            </Avatar>
            <div className="name">
              <p className="p1">
                {userInfo?.data?.data?.user?.firstName}
                {userInfo?.data?.data?.user?.lastName}
              </p>
              <p className="p2">{userInfo?.data?.data?.user?.email}</p>
            </div>
          </div>
        </div>
      </div>
      <ContentWrapper>{component}</ContentWrapper>
    </div>
  );
};

export default Sidebar;
