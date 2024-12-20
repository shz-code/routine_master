import { twMerge } from "tailwind-merge";

const TextArea = ({
  type = "text",
  placeholder = "",
  label,
  className,
  id,
  required,
  disabled,
  ...rest
}) => {
  return (
    <div className="inputGroup space-y-2">
      <label htmlFor={id}>
        {label}{" "}
        <span className="text-red-600 font-extrabold">{required && " *"}</span>
      </label>
      <textarea
        type={type}
        placeholder={placeholder}
        id={id}
        rows={5}
        disabled={disabled}
        {...rest}
        className={twMerge(
          `px-4 py-2 rounded shadow-none bg-transparent border-2 border-slate-200 bg-white text-black w-full ${
            disabled ? "bg-slate-100 cursor-not-allowed" : "bg-white"
          }`,
          className
        )}
      ></textarea>
    </div>
  );
};

export default TextArea;
