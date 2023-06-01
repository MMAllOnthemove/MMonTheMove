// These are the prop types for the input field component
interface Props {
  name: string;
  placeholder?: string;
  type: string;
  size?: number;
  checked?: boolean;
  value?: string;
  className: string;
  onChange?: () => void | any;
}

function InputField(props: Props) {
  const { name, placeholder, type, size, checked, className, value } = props;
  return (
    <>
      <form>
        <input
          name={name}
          className={className}
          placeholder={placeholder}
          type={type}
          size={size}
          checked={checked}
          value={value}
        />
      </form>
    </>
  );
}

export default InputField;
