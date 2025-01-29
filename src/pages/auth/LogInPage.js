import React from "react";
import { useLoginMutation } from "../../services/authApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import classes from "./loginPage.module.css";
import { Branding } from "../../component/branding/Branding";
import { DynamicForm } from "../../component/dynamicForm/DynamicForm";
export const LoginPage = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const onSubmit = async (data) => {
    const loadingToastId = toast.loading("authenticating...");
    try {
      const response = await login({
        email_id: data.email,
        password: data.password,
      }).unwrap();
      toast.dismiss(loadingToastId);
      toast.success(response.message.displayMessage);
      navigate("/");
    } catch (err) {
      toast.dismiss(loadingToastId);
      toast.error(err.data.message.displayMessage);
    }
  };
  const formConfig = [
    {
      id: "email", // Unique identifier for this input
      type: "email", // Input type (email for email validation)
      label: "Email", // Label text
      placeholder: "Enter your email", // Placeholder text
      validation: {
        required: { value: true, message: "Email is required" }, // Validation rule for required input
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: "Enter a valid email address", // Error message for invalid format
        },
      },
    },
    {
      id: "password", // Unique identifier for this input
      type: "password", // Input type
      label: "Password", // Label text
      placeholder: "Enter your password", // Placeholder text
      validation: {
        required: { value: true, message: "Password is required" }, // Validation rule for required input (consistent format)
        // pattern: {
        //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/, // Regex for password strength
        //   message: "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character", // Error message for pattern mismatch
        // },
        minLength: {
          value: 5,
          message: "Password must be at least 5 characters long",
        },
      },
    },
  ];
  return (
    <div className={classes.box}>
    <div className={classes.box__form}>
      <Branding />
      <DynamicForm
        config={formConfig}
        onSubmit={onSubmit}
        primaryButtonLabel="Sign In"
      />
    </div>
  </div>
  );
};
