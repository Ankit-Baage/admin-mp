import dashboard from "../../assets/home.svg";
import prexo from "../../assets/prexo.svg";
import vrp from "../../assets/vrp.svg";
import openBox from "../../assets/openBox.svg";
import spare from "../../assets/spare.svg";
import new_phone from "../../assets/new_phone.svg";
import payment from "../../assets/payment.svg";
import profile from "../../assets/profile.svg";
import advertisement from "../../assets/advertisement__sidebar.svg"

export const dropdowns = [
  {
    id: "category",
    title: "Manage Inventory",
    options: [
      { id: "vrp", image: vrp, name: "VRP", path: "vrp" },
      { id: "spares", image: spare, name: "Spares", path: "spares" },
      {
        id: "new_phones",
        image: new_phone,
        name: "New Phones",
        path: "new_phones",
      },
      { id: "prexo", image: prexo, name: "Prexo", path: "prexo" },
      { id: "openBox", image: openBox, name: "Open Box", path: "open_box" },
    ],
  },
  {
    id: "masters",
    title: "Manage Masters",
    options: [
      { id: "vrp", image: vrp, name: "VRP", path: "masters/vrp" },
      { id: "spares", image: spare, name: "Spares", path: "masters/spares" },
      {
        id: "new_phones",
        image: new_phone,
        name: "New Phones",
        path: "masters/new_phones",
      },
      { id: "prexo", image: prexo, name: "Prexo", path: "masters/prexo" },
      { id: "openBox", image: openBox, name: "Open Box", path: "masters/open_box" },
    ],
  },
 
];

export const withoutDropdowns = [
  { id: "home", image: dashboard, name: "Home", path: "/" },
  {
    id: "advertisement",
    image: advertisement,
    name: "Advertisement",
    path: "advertisement",
  },
  {
    id: "payment_verification",
    image: payment,
    name: "Payment Verification",
    path: "orders",
  },
  {
    id: "profile_verification",
    image: profile,
    name: "Profile Verification",
    path: "retailers",
  },
  
];
