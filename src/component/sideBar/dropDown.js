import dashboard from "../../assets/home.svg";
import prexo from "../../assets/prexo.svg";
import vrp from "../../assets/vrp.svg";
import openBox from "../../assets/openBox.svg";
import spare from "../../assets/spare.svg";
import new_phone from "../../assets/new_phone.svg";

export const dropdowns = [
  {
    id: "category",
    title: "Modules",
    options: [
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
    ],
  },
  {
    id: "masters",
    title: "Manage Masters",
    options: [
      { id: "vrp", image: vrp, name: "VRP", path: "masters/vrp" },
      { id: "spares", image: spare, name: "SPARES", path: "masters/spares" },
      {
        id: "new_phones",
        image: new_phone,
        name: "New Phones",
        path: "masters/new_phones",
      },
      { id: "prexo", image: prexo, name: "PREXO", path: "masters/prexo" },
      { id: "openBox", image: openBox, name: "OPEN-BOX", path: "masters/open_box" },
    ],
  },
];

export const withoutDropdowns = [
  { id: "home", image: dashboard, name: "HOME", path: "/dashboard" },
  {
    id: "advertisement",
    image: openBox,
    name: "ADVERTISEMENT",
    path: "advertisement",
  },
];
