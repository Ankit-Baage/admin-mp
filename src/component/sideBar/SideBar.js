import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import dashboard from "../../assets/home.svg";
import prexo from "../../assets/prexo.svg";
import vrp from "../../assets/vrp.svg";
import openBox from "../../assets/openBox.svg";
import spare from "../../assets/spare.svg";
import new_phone from "../../assets/new_phone.svg";

import { NavLink, useNavigate } from "react-router-dom";

import classes from "./sideBar.module.css";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { apiSlice } from "../../services/apiSlice";
import { toast } from "react-toastify";
import { useUserProfileQuery } from "../../services/authApiSlice";

const categories = [
  { id: "home", image: dashboard, name: "HOME", path: "/dashboard" },
  { id: "vrp", image: vrp, name: "VRP", path: "vrp" },
  { id: "spares", image: spare, name: "SPARES", path: "spares" },
  {
    id: "new_phones",
    image: new_phone,
    name: "New Phones",
    path: "new_phones",
  },
  { id: "prexo", image: prexo, name: "PREXO", path: "prexo" },
  { id: "openBox", image: openBox, name: "OPEN-BOX", path: "open_box" },
  { id: "advertisement", image: openBox, name: "ADVERTISEMENT", path: "advertisement" },
];

const contacts = [
  { id: "phone", link: "+91 9999123511" },
  { id: "email", link: "contact@mobigarage.com" },
];

export const SideBar = () => {
  const [profile, setProfile] = useState({
    userImg: null,
    userName: null,
    userId: null,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const carousel = useRef();
  const { data, isSuccess } = useUserProfileQuery();
  console.log(data);
  const name = data?.data?.name || "A"; // Default to "A" if name is undefined
  const id = data?.data?.id
  const img = name.slice(0, 1).toUpperCase(); // First letter capitalized
  const userName = img + name.slice(1); //
  useEffect(() => {
    if (isSuccess) {
      setProfile({
        userImg: img,
        userName,
        userId: id,
      });
    }
  }, [id, img, isSuccess, userName]);

  const handleLogOut = () => {
    Cookies.remove("token");
    Cookies.remove("expirationTime");
    dispatch(logout());
    dispatch(apiSlice.util.resetApiState());
    toast.success("Logged out successfully");
    navigate("/");
  };
  return (
    <div className={classes.stack}>
      <div className={classes.container}>
        <div className={classes.container__box}>
          <div className={classes.container__profile}>
            <div className={classes.container__profile__box}>
              {/* <img
                src={profile}
                alt="User"
                className={classes.container__profile__box__img}
              /> */}
              {profile.userImg}
            </div>
            <div className={classes.container__profile__info}>
              <h1 className={classes.container__profile__info__name}>
                Name: {profile.userName}
              </h1>
              <h1 className={classes.container__profile__info__name}>
                User Id: {profile.userId}
              </h1>
            </div>
          </div>
          <hr className={classes.box__item__divider} />
        </div>
        <div className={classes.container__box__categories}>
          <h1 className={classes.container__box__categories__title}>
            Categories
          </h1>
          <div className={classes.box__colors__carousel} ref={carousel}>
            <div
              className={`${classes.container__box__categories__box} ${classes.box__colors__carousel__inner}
          `}
            >
              {categories.map((category) => (
                <NavLink
                  to={category.path}
                  key={category.id}
                  className={({ isActive }) =>
                    isActive
                      ? `${classes.container__box__categories__box__category} ${classes.isActive}`
                      : classes.container__box__categories__box__category
                  }
                  end
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className={
                      classes.container__box__categories__box__category__img
                    }
                  />
                  <h5
                    className={
                      classes.container__box__categories__box__category__name
                    }
                  >
                    {category.name}
                  </h5>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
        <div className={classes.container__box__categories}>
          <hr className={classes.box__item__divider} />
          <h1 className={classes.container__box__categories__title}>
            Contact Us
          </h1>
          <div className={classes.container__box__categories__box}>
            {contacts.map((contact) => (
              <a
                href="tel:+91 9999123511"
                key={contact.id}
                className={classes.container__box__categories__box__category}
              >
                <h5
                  className={
                    classes.container__box__categories__box__category__name
                  }
                >
                  {contact.link}
                </h5>
              </a>
            ))}
          </div>
          <hr className={classes.box__item__divider} />
        </div>
        <div className={classes.container__box__categories}>
          <button
            type="button"
            className={classes.box__btn}
            onClick={handleLogOut}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};
