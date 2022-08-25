import React from "react";

const Input = ({ lableText, lableClass, placeholder, onBlurAction }) => {
  const errorrr = onBlurAction((e) => e.target.value);

  return (
    <div>
      <label className={lableClass}>{lableText}</label>
      <input placeholder={placeholder} onBlur={onBlurAction} />
      <p>{errorrr}</p>
    </div>
  );
};

export default Input;
