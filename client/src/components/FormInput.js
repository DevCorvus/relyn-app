import React from "react";
import Label from "./Label";
import ValidationError from "./errors/ValidationError";

export default function FormInput({
  children,
  value,
  onChange,
  onBlur,
  name,
  id,
  error,
  type = "text",
  label = "",
  textarea = false,
  defaultValue = false,
  autoFocus = false
}) {

  let inputClassName = `w-full p-2 border-2 ${error ? "border-red-200" : "border-gray-200"} rounded-md outline-none focus:${error ? "border-red-400" : "border-blue-300"} transition duration-200`;
  if (textarea) inputClassName += " resize-none";

  return (
    <div>
      <Label htmlFor={id || name}>{label}</Label>
      {textarea ? (
        <>
          {defaultValue ? (
            <textarea
              className={inputClassName}
              onChange={onChange}
              onBlur={onBlur}
              name={name}
              id={id || name}
              defaultValue={value}
              autoFocus={autoFocus}
              placeholder={children}
            ></textarea>
          ) : (
            <textarea
              className={inputClassName}
              onChange={onChange}
              onBlur={onBlur}
              name={name}
              id={id || name}
              value={value}
              autoFocus={autoFocus}
              placeholder={children}
            ></textarea>
          )}
        </>
      ) : (
        <>
          {defaultValue ? (
            <input
              className={inputClassName}
              onChange={onChange}
              onBlur={onBlur}
              name={name}
              id={id || name}
              defaultValue={value}
              type={type}
              autoFocus={autoFocus}
              placeholder={children}
            />
          ) : (
            <input
              className={inputClassName}
              onChange={onChange}
              onBlur={onBlur}
              name={name}
              id={id || name}
              value={value}
              type={type}
              autoFocus={autoFocus}
              placeholder={children}
            />
          )}
        </>
      )}
      <ValidationError>{error}</ValidationError>
    </div>
  );
}
