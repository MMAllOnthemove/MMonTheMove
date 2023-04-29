
interface Props {
    name: string;
    placeholder?: string;
    type: string;
    size?: number;
    checked?: boolean;
    value?: string;
    className: string;

}

function InputField(props: Props) {
    const { name, placeholder, type, size, checked,className, value } = props;
    return (
        <>
            <input name={name} className={className} placeholder={placeholder} type={type} size={size} checked={checked} value={value} />
        </>
    )
}

export default InputField
