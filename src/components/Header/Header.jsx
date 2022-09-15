import React from "react";
import NavBarItem from "../NavBarItem/NavBarItem";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import ExploreIcon from "@mui/icons-material/Explore";
import DehazeIcon from "@mui/icons-material/Dehaze";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import "./header.scss";
import SearchBox from "../SearchBox/SearchBox";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext, INITIAL_STATE } from "../../context/SearchContext";
function Header({ type }) {
  const navigate = useNavigate();
  const location = window.location.pathname.split("/")[1];
  const { dispatch } = useContext(SearchContext);
  const [open, setOpen] = useState(false);
  const navbar__options = [
    {
      id: 1,
      title: "Hotels",
      icon: <BedOutlinedIcon />,
      isActive: true,
    },
    {
      id: 2,
      title: "Explore",
      icon: <ExploreIcon />,
      isActive: false,
    },
  ];
  const [optionData, setOptionData] = useState(navbar__options);
  function handleActive(id) {
    setOptionData(
      optionData.map((item) =>
        item.id === id
          ? { ...item, isActive: !item.isActive }
          : { ...item, isActive: false }
      )
    );
  }
  function handleClick(page) {
    dispatch({ type: "RESET_SEARCH" });
    navigate(`/${page}`, {
      state: {
        destination: INITIAL_STATE.city,
        date: INITIAL_STATE.date,
        options: INITIAL_STATE.options,
      },
    });
  }
  return (
    <div className="header">
      <div
        className={
          type === "home" ? "header__container home" : "header__container"
        }
      >
        <div className={open ? "header__items open" : "header__items"}>
          <div className="header__item" onClick={() => setOpen(!open)}>
            {!open ? (
              <DehazeIcon className="hamburger" />
            ) : (
              <CloseIcon className="hamburger" />
            )}
          </div>
          {open
            ? optionData.map((item) => (
                <div
                  key={item.id}
                  className={
                    location === item.title.toLowerCase()
                      ? "header__item active"
                      : "header__item"
                  }
                  onClick={() => {
                    handleActive(item.id);
                    handleClick(item.title.toLowerCase());
                  }}
                >
                  <NavBarItem title={item.title} Icon={item.icon} />
                </div>
              ))
            : null}
        </div>
        {type === "home" ? (
          <>
            <div className="header__info">
              <h1 className="HeaderTitle">
                Feel like you need a much needed break? Dont worry we got you
                covered
              </h1>
              <p className="headerSubtitle">
                Multiple Cities. Multiple Hotels. Discounted price. We got the
                whole package.
              </p>
            </div>
            <div className="headerSearch">
              <SearchBox />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Header;
