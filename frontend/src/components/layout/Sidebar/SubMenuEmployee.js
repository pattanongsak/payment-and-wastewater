import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../../../css/Sidebar/Sidebar.css";

const SubMenuEmployee = ({ item, user }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);

  if (user.role === "employee") {
    return (
      <div>
        <Link
          className="sidebarLink"
          to={item.path}
          onClick={item.subNav && showSubnav}
        >
          <div className="flex">
            {item.icon}
            <div className="sidebarLabel">{item.title}</div>
          </div>
          <div>
            {item.subNav && subnav
              ? item.iconOpened
              : item.subNav
              ? item.iconClosed
              : null}
          </div>
        </Link>
        {subnav &&
          item.subNav.map((item, index) => {
            return (
              <Link className="dropdowLink" to={item.path} key={index}>
                {item.icon}
                <div className="sidebarLabel">{item.title}</div>
              </Link>
            );
          })}
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default SubMenuEmployee;
