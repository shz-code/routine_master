import { twMerge } from "tailwind-merge";

const Select = ({
  selectItems = [],
  handleChange,
  className,
  label = "",
  disabled,
  id,
  required = false,
  ...rest
}) => {
  return (
    <div className="inputGroup space-y-2">
      <label htmlFor={id} className="print:hidden">
        {label}
        <span className="text-red-600 font-extrabold">{required && " *"}</span>
      </label>
      <select
        className={twMerge(
          ` px-4 py-2 rounded shadow-none bg-transparent border-2 border-slate-200  text-black w-full ${
            disabled ? "bg-slate-100 cursor-not-allowed" : "bg-white"
          }`,
          className
        )}
        onChange={handleChange}
        id={id}
        required={required}
        {...rest}
      >
        <option hidden value="">
          {label ? label : "Select"}
        </option>
        {!disabled &&
          selectItems.map((item) => (
            <option
              key={item.value ? item.value : item.id ? item.id : item.name}
              value={item.value ? item.value : item.id ? item.id : item.name}
              selected={item.selected}
            >
              {item.label ? item.label : item.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;
