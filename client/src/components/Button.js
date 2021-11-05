import React from "react";

export default function Button({ children, type = "button", isDisabled = false, color = "blue", fullWidth = false, onClick }) {
  const buttonClasses = {
    base: `bg-${color}-400 hover:bg-${color}-500 focus:bg-${color}-500 border-${color}-500`,
    disabled: "bg-gray-400 border-gray-500 cursor-default",
    default: ` py-1 px-2 text-white text-lg font-semibold border-2 rounded-lg transition duration-200 ${fullWidth ? "w-full" : ""}`
  }
  return (
    <>
      {onClick ? (
        <button
          onClick={onClick}
          disabled={isDisabled}
          className={(isDisabled ? buttonClasses.disabled : buttonClasses.base) + buttonClasses.default}
          type={type}
        >
          {children}
        </button>
      ) : (
        <button
          disabled={isDisabled}
          className={(isDisabled ? buttonClasses.disabled : buttonClasses.base) + buttonClasses.default}
          type={type}
        >
          {children}
        </button>
      )}
    </>
  );
}
