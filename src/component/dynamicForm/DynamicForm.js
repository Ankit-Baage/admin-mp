import React from "react";
import { useForm } from "react-hook-form";
import { CustomInput } from "./customInput/CustomInput";
import { CustomSelect } from "./customSelect/CustomSelect";

import classes from "./dynamicForm.module.css";

import { CustomTextArea } from "./customTextArea/CustomTextArea";
import { CustomMediaPreview } from "./customMediaPreview/CustomMediaPreview";
import { FileUploadInput } from "./fileUploadInput/FileUploadInput";

export const DynamicForm = ({
  heading,
  config,
  onSubmit,
  onClose,
  primaryButtonLabel,
  secondaryButtonLabel,
  onSecondHandler,
  isGridRequired,
}) => {
  const defaultValues = config.reduce((acc, field) => {
    acc[field.id] = field.defaultValue || ""; // Set default values for each field
    return acc;
  }, {});
  const { register, handleSubmit, setValue, formState } = useForm({
    defaultValues,
  });
  const { isValid } = formState;
  console.log(config);

  const handleFileChange = (id, url) => {
    setValue(id, url);
    console.log("url", url);
  };

  console.log("dynamicForm isValid: ", isValid); // Debugging log

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      {heading && <h1 className={classes.form__head}>{heading}</h1>}
      <div
        className={`${classes.form} ${
          isGridRequired ? classes.from__grid : ""
        }`}
      >
        {config.map((field, index) => {
          const key = `${field.id}_${index}`;

          switch (field.type) {
            case "text":
            case "email":
            case "password":
            case "number":
              return (
                <CustomInput
                  key={key}
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  label={field.label}
                  register={register}
                  validation={field.validation}
                  disabled={field.disabled}
                />
              );

            case "select":
              return (
                <CustomSelect
                  key={key}
                  options={field.options}
                  label={field.label}
                  onChange={(value) => setValue(field.id, value)}
                />
              );

            case "file":
              return (
                <FileUploadInput
                  key={key}
                  id={field.id}
                  onChange={handleFileChange}
                  label={field.label}
                  urlWithExt={field.urlWithExt}
                  url={field?.url}
                  disabled={field.disabled}
                />
              );
            case "textarea": // Add support for CustomTextArea
              return (
                <CustomTextArea
                  key={key}
                  id={field.id}
                  placeholder={field.placeholder}
                  label={field.label}
                  register={register}
                  validation={field.validation}
                  disabled={field.disabled}
                />
              );
            case "preview":
              return (
                <CustomMediaPreview
                  key={key}
                  id={field.id}
                  label={field.label}
                  register={register}
                  disabled={field.disabled}
                  media_type={field.media_type}
                  url={field.url}
                  urlWithExt={field.urlWithExt}
                />
              );
            default:
              return null;
          }
        })}
      </div>

      <div className={classes.form__btns}>
        <button
          type="submit"
          style={{ width: !secondaryButtonLabel ? "100%" : "" }}
          className={`${classes.form__btn} ${
            isValid ? classes.form__btn__enabled : ""
          }`}
          disabled={!isValid}
        >
          {primaryButtonLabel}
        </button>
        {secondaryButtonLabel && (
          <button
            type="button"
            className={`${classes.form__btn} ${classes.form__btn__enabled}`}
            onClick={onSecondHandler}
          >
            {secondaryButtonLabel}
          </button>
        )}
      </div>
    </form>
  );
};
