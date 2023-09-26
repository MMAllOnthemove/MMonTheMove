import React from "react";

interface IButton {
  onClick?: () => void;
  type: "submit" | "button";
  className: string;
  text: string;
  color?: string; // optional because we can style using tailwind
}

function Button(props: IButton) {
  const { onClick, type, className, text, color } = props;
  return (
    <button role="button" onClick={onClick} type={type} className={className}>
      {text}
    </button>
  );
}

export default Button;
