import React, { useContext } from "react";
import { IoHome } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaQuestion } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { FaTags } from "react-icons/fa";
import classes from "./leftProfile.module.css";
import { Link } from "react-router-dom";
import { AppState } from "../../App";

const LeftProfile = () => {
  const { user, setUser } = useContext(AppState);
  return (
    <div className={classes.icons}>
      <ul className={classes.iconsList}>
        <li>
          <a href="">
            <CgProfile />
            <br />
            <small>{user?.username}</small>
          </a>
        </li>
        <li>
          <a href="">
            <IoHome />
            <br />
            <small>Home</small>
          </a>
        </li>
        <li>
          <Link to="/question">
            <FaQuestion />
            <br />

            <small>Ask question</small>
          </Link>
        </li>
        <li>
          <a href="" style={{ position: "relative" }}>
            <IoNotifications />
            <br />
            <span className={classes.notificationBadge}>5</span>{" "}
            <span>Notification</span>
          </a>
        </li>
        <li>
          <a href="">
            <FaTags />
            <br />
            <span>Search by tag</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default LeftProfile;
