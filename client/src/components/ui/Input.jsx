import { twMerge } from "tailwind-merge";
const Input = ({
  type = "text",
  placeholder = "",
  className,
  id,
  label,
  required = false,
  disabled,
  ...rest
}) => {
  return (
    <div className="inputGroup space-y-2">
      <label htmlFor={id}>
        {label}
        <span className="text-red-600 font-extrabold">{required && " *"}</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        name={id}
        disabled={disabled}
        required={required}
        {...rest}
        className={twMerge(
          ` px-4 py-2 rounded shadow-none bg-transparent border-2 border-slate-200  text-black w-full ${
            disabled ? "bg-slate-100 cursor-not-allowed" : "bg-white"
          }`,
          className
        )}
      />
    </div>
  );
};

export default Input;
