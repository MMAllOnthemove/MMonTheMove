import React from "react";
import { IButton } from "../../../utils/interfaces";

function Button(props: IButton) {
  const { onClick, type, className, text, color } = props;
  return (
    <button role="button" onClick={onClick} type={type} className={className}>
      {text}
    </button>
  );
}

export default Button;
