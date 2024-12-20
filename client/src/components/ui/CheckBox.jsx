import { twMerge } from "tailwind-merge";
const CheckBox = ({
  className,
  id,
  label,
  required = false,
  disabled,
  ...rest
}) => {
  return (
    <div className="inputGroup flex items-center gap-2">
      <input
        type="checkbox"
        id={id}
        name={id}
        disabled={disabled}
        required={required}
        {...rest}
        className={twMerge(
          ` w-4 h-4 accent-[#010231] cursor-pointer rounded ${
            disabled ? "bg-slate-100 cursor-not-allowed" : "bg-white"
          }`,
          className
        )}
      />
      <label htmlFor={id} className="cursor-pointer">
        {label}
        <span className="text-red-600 font-extrabold">{required && " *"}</span>
      </label>
    </div>
  );
};

export default CheckBox;
