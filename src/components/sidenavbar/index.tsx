import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { NavLink as Link, useLocation } from "react-router-dom";

import * as colors from "../../colors";
import Arrow from "../../images/arrow-icon.png";
import SearchWhite from "../../images/search-icon-white.png";

type NavIconProps = {
  arrow?: boolean;
  search?: boolean;
};

type SideNavBarContProps = {
  isVisible: boolean;
};

export default function SideNavBar() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    // You can add any side effects here if needed
  }, []);

  return (
    <SideNavBarCont isVisible={isVisible}>
      <SideNavMainLink
        className="menu_nav_link main_nav_link home-link"
        to="/"
        exact
      >
        Wesley
        <NavIcon arrow>
          <img src={Arrow} alt="Arrow" />
        </NavIcon>
      </SideNavMainLink>
      <SideNavMainLink className="menu_nav_link" to="/discover">
        Discover
        <NavIcon search>
          <img src={SearchWhite} alt="Search" />
        </NavIcon>
      </SideNavMainLink>
      <SideNavHeader>
        <HeaderText>Watched</HeaderText>
      </SideNavHeader>
      <NavLink className="menu_nav_link" to="/watched/movies">
        Movies
      </NavLink>
      <NavLink className="menu_nav_link" to="/watched/tv-shows">
        Tv Shows
      </NavLink>
      <SideNavHeader>
        <HeaderText>Saved</HeaderText>
      </SideNavHeader>
      <NavLink className="menu_nav_link" to="/saved/movies">
        Movies
      </NavLink>
      <NavLink className="menu_nav_link" to="/saved/tv-shows">
        Tv Shows
      </NavLink>
    </SideNavBarCont>
  );
}

const SideNavBarCont = styled.div<SideNavBarContProps>`
  position: fixed;
  z-index: 9;
  width: 280px;
  height: 100%;
  background-color: ${colors.sideNavBar};
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    transform: ${({ isVisible }) =>
      isVisible ? "translateX(0)" : "translateX(-100%)"};
  }
`;

const SideNavMainLink = styled(Link)`
  position: relative;
  display: block;
  padding: 25px 35px;
  font-size: 1.6em;
  font-weight: 700;
  color: white;
  text-decoration: none;

  &:hover {
    background-color: ${colors.sideNavBarHover};
  }

  &.active {
    background-color: ${colors.primaryColor};
  }

  &.home-link {
    background-color: ${colors.sideNavBar};
  }
`;

const NavIcon = styled.div<NavIconProps>`
  position: absolute;
  right: 35px;
  top: 50%;
  transform: translateY(-50%);

  img {
    width: 100%;
    height: 100%;
  }
`;

const SideNavHeader = styled.div`
  padding: 20px 35px 10px;
`;

const HeaderText = styled.div`
  color: white;
  font-size: 1.1em;
`;

const NavLink = styled(Link)`
  display: block;
  padding: 10px 35px;
  color: ${colors.fontColor};
  text-decoration: none;

  &:hover {
    background-color: ${colors.sideNavBarHover};
  }

  &.active {
    background-color: ${colors.primaryColor};
    color: ${colors.sideNavBar};
  }
`;
