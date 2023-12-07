import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {
  SidebarAdminData,
  SidebarEmployeeData,
  SidebarUserData,
} from "./SidebarData";

import SubMenuAdmin from "./SubMenuAdmin";
import SubMenuEmployee from "./SubMenuEmployee";
import SubMenuUser from "./SubMenuUser";

import { IconContext } from "react-icons/lib";
import logo from "../../../images/logo.png";
import DateTime from "./DateTime";
import ViewProfile from "./ViewProfile";
import { useSelector } from "react-redux";

const Nav = styled.div`
  width: 100%;
  background: #3187c3;
  height: 60px;
  justify-content: flex-start;
  align-items: center;
  display: flex;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 1.7rem;
  display: flex;
  position: fixed;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
  background-color: #303030;
  transition: 0.6s;
  border-radius: 20%;
  padding: 7px;
  z-index: 2;
  &:hover,
  :focus {
    background-color: #fff;
    color: #303030;
  }

  &#iconClose {
    margin-top: 10px;
  }
`;

const SidebarNav = styled.nav`
  background: #f0f0f0;
  width: 300px;
  height: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

const SidebarWrap = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  margin-top: 320px;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const SidebarBanner = styled.div`
  top: 0;
  position: fixed;
  background: #3187c3;
  width: 300px;
  height: 320px;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

const Logo = styled.div`
  display: flex;
`;

const LogoImg = styled(Link)`
  margin: 40px auto;
  margin-bottom: 0;
`;

const TextTitle = styled.div`
  margin-top: 5px;
  margin-left: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #f0f0f0;
`;

const Bottom60 = styled.div`
  padding-bottom: 0px;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const { isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <>
      <IconContext.Provider value={{}}>
        <Nav>
          {isAuthenticated ? (
            <NavIcon to="#">
              <FaIcons.FaBars onClick={showSidebar} />
            </NavIcon>
          ) : (
            <div></div>
          )}
          {isAuthenticated ? (
            <ViewProfile user={user} />
          ) : (
            <Link className="loginLink" to="/login">
              <p>เข้าสู่ระบบ</p>
            </Link>
          )}
        </Nav>
        <SidebarNav sidebar={sidebar}>
          {/* onLoad={showSidebar} */}
          <SidebarBanner>
            <NavIcon to="#" id="iconClose">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            <Logo>
              <LogoImg to="/">
                <img src={logo} width="140" height="140" alt="" />
              </LogoImg>
            </Logo>
            <TextTitle>
              <p>ยินดีต้อนรับเข้าสู่ </p>
              <p>เทศบาลตำบลสันผักหวาน</p>
              <p>อ.หางดง จ.เชียงใหม่</p>
            </TextTitle>
            <DateTime />
          </SidebarBanner>
          {isAuthenticated && (
            <SidebarWrap>
              {SidebarAdminData.map((item, index) => {
                return <SubMenuAdmin item={item} key={index} user={user} />;
              })}

              {SidebarEmployeeData.map((item, index) => {
                return <SubMenuEmployee item={item} key={index} user={user} />;
              })}

              {SidebarUserData.map((item, index) => {
                return <SubMenuUser item={item} key={index} user={user} />;
              })}
            </SidebarWrap>
          )}
        </SidebarNav>
      </IconContext.Provider>
      <Bottom60 />
    </>
  );
};

export default Sidebar;
