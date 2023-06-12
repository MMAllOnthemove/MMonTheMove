import React from "react";

interface Props {
  inputValue?: any;
  onChange: Function;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  style?: Object;
  formId: string;
  formLabel: string;
  type: any;
  autoComplete?: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  title?: string;
  formName: string;
  forAttribute: string;
}

function FieldForm(props: Props) {
  return (
    <>
      <form className="flex justify-center flex-col">
        <label
          htmlFor={props.forAttribute}
          className="text-[1.2rem] capitalize text-gray-900 font-sans font-semibold"
        >
          {props.formLabel}
        </label>
        <input
          type={props.type}
          name={props.formName}
          id={props.formId}
          value={props.inputValue}
          className="p-2 border border-gray-600 rounded w-[300px] mx-auto"
        />
      </form>
    </>
  );
}

export default FieldForm;
