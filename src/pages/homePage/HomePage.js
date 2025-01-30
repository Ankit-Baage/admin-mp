import React from "react";
import newOrder from "../../assets/newOrder.svg";
import addInventory from "../../assets/addInventory.svg";
import prexo from "../../assets/prexo.svg";
import vrp from "../../assets/vrp.svg";
import openBox from "../../assets/openBox.svg";
import spare from "../../assets/spare.svg";
import new_phone from "../../assets/new_phone.svg";
import { Info } from "../../component/infoCard/Info";
import { Card } from "../../component/infoCard/Card";
import classes from "./homePage.module.css";

import { PieChart } from "../../component/graphs/piChart/PiChart";
import { Link } from "react-router-dom";
import {
  useGetOrderSummaryQuery,
  useGetProfilePaymentSummaryQuery,
  useGetSalesSummaryQuery,
} from "../../services/homeApiSlice";
import { CustomSelect } from "../../component/customSelect/CustomSelect";


const optionData = [
  { id: 1, label: "weekly" },
  { id: 2, label: "monthly" },
  { id: 3, label: "yearly" },
];


const buttonGroups = [
  {
    id: 1,
    titleImage: addInventory,
    title: "Manage Inventory Request",
    isLink: {
      active: false,
      path: null,
    },
    buttons: [
      { id: "1-1", image: spare, title: "spares", path: "spares" },
      { id: "1-2", image: vrp, title: "VRP", path: "vrp" },
      { id: "1-3", image: new_phone, title: "New Phones", path: "new_phones" },
      { id: "1-4", image: openBox, title: "Open Box", path: "open_box" },
      // { id: "2-5", image: prexo, title: "Prexo", path: "prexo" },
    ],
  },
];

export const HomePage = () => {
  const {
    data: earningSummary,
    isLoading: earningLoading,
    isError: earningError,
    isSuccess: earningSuccess,
  } = useGetSalesSummaryQuery();

  const {
    data: orderSummary,
    isLoading: orderLoading,
    isError: orderError,
  } = useGetOrderSummaryQuery();
  const {
    data: profilePaymentSummary,
    isLoading: profilePaymentLoading,
    isError: profilePaymentError,
  } = useGetProfilePaymentSummaryQuery();

  console.log("earnings", earningSummary?.sales_summary);
  console.log("orders", orderSummary);
  return (
    <div className={classes.box}>
      <div className={classes.box__content}>
        <div className={classes.box__infoCards}>
          {orderSummary?.map((infoCard) => (
            <Card key={infoCard.id} className={classes.box__infoCards__card}>
              <Info
                image={infoCard.image}
                title={infoCard.title}
                subTitle={infoCard.subTitle}
              />
            </Card>
          ))}
        </div>
        {earningSuccess ? (
          <Card className={classes.box__earningCard}>
            <div className={classes.box__earning}>
              <div className={classes.box__earning__leftColumn}>
                <div className={classes.box__earning__leftColumn__content}>
                  <h1 className={classes.box__earning__leftColumn__title}>
                    Earning Report
                  </h1>
                  <h1 className={classes.box__earning__leftColumn_subTitle}>
                    Income report seen in graphs
                  </h1>
                </div>
                {earningSummary?.earning_summary ? (
                  <div className={classes.box__infoCards__earnings}>
                    {earningSummary?.earning_summary?.map((earning) => (
                      <Info
                        key={earning.id}
                        image={earning.image}
                        title={earning.title}
                        subTitle={earning.subTitle}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
              {earningSummary?.sales_summary ? (
                <div className={classes.box__earning__rightColumn}>
                  <CustomSelect options={optionData} label="Choose" />

                  <PieChart data={earningSummary?.sales_summary} />
                </div>
              ) : null}
            </div>
          </Card>
        ) : null}
      </div>
      <hr className={classes.box__sep} />
      <div className={classes.box__content__actions}>
        {profilePaymentSummary?.map((action) => (
          <Link key={action.id} to={action.path}>
            <Card
              className={classes.box__content__actions__card}
              badge={{ status: "Pending" }}
            >
              <Info
                image={action.image}
                title={action.title}
                subTitle={action.subTitle}
              />
            </Card>
          </Link>
        ))}
      </div>
      <div className={classes.box}>
        {buttonGroups.map((buttonGroup) => (
          <div className={classes.box__nav} key={buttonGroup.id}>
            <div className={classes.box__nav__head}>
              <div className={classes.box__nav__head__wrapper}>
                <img
                  src={buttonGroup.titleImage}
                  alt={buttonGroup.title}
                  className={classes.box__nav__img}
                />
                <h1 className={classes.box__nav__title}>{buttonGroup.title}</h1>
              </div>
            </div>

            <hr className={classes.box__nav__sep} />
            <div className={classes.box__nav__buttons}>
              {buttonGroup.buttons.map((button) =>
                button.path ? (
                  <Link
                    to={button.path}
                    className={classes.box__nav__buttons__button}
                    key={button.id}
                  >
                    <img
                      src={button.image}
                      alt={button.title}
                      className={classes.box__nav__buttons__bnt__img}
                    />
                    <h1 className={classes.box__nav__buttons__bnt__title}>
                      {button.title}
                    </h1>
                  </Link>
                ) : (
                  <div
                    className={classes.box__nav__buttons__button}
                    key={button.id}
                  >
                    <img
                      src={button.image}
                      alt={button.title}
                      className={classes.box__nav__buttons__bnt__img}
                    />
                    <h1 className={classes.box__nav__buttons__bnt__title}>
                      {button.title}
                    </h1>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
