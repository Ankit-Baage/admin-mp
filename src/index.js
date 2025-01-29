import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store";
import { ActionModal } from "./component/actionModal/ActionModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import PriorityModal from "./component/priorityModal/PriorityModal";
import { AdvertisementActionModal } from "./component/advertisementActionModal/AdvertisementActionModal";
import { MediaPreview } from "./component/mediaPreview/MediaPreview";
import "./index.css";
import { MastersVrpActionModal } from "./component/mastersActionModal/MastersVrpActionModal";
import { VariantModal } from "./component/variantModal/VariantModal";
import { OrderActionModal } from "./component/orderActionModal/OrderActionModal";
import { RetailerActionModal } from "./component/retailerActionModal/RetailerActionModal";
import { Modal } from "./component/modal/Modal";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Modal/>
      <RetailerActionModal />
      <OrderActionModal />
      <PriorityModal />
      <ActionModal />
      <AdvertisementActionModal />
      <MediaPreview />
      <MastersVrpActionModal />
      <VariantModal />
      <App />
      <ToastContainer
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
