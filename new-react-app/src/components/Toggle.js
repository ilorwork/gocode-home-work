import React, { useState, useEffect } from "react";
const text = "Hidden Text";

const Toggle = () => {
  const [isToggle, setIsToggle] = useState(true);

  useEffect(() => {
    console.log(`${isToggle} ${text}`);
  }, [isToggle]);

  const toggleClickHandler = () => {
    setIsToggle((prev) => !prev);
  };

  return (
    <div>
      <button onClick={toggleClickHandler}>Toggle</button>
      {isToggle && <p>{text}</p>}
    </div>
  );
};

export default Toggle;
