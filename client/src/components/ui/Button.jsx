import { twMerge } from "tailwind-merge";
import Loader from "./Loader";

const Button = ({ className, disabled, loading, children, ...rest }) => {
  return (
    <button
      className={twMerge(
        `bg-slate-900 hover:bg-slate-950 text-white px-4 py-2 rounded  transition-all disabled:bg-slate-600 ${
          !disabled && "active:scale-95"
        }`,
        className
      )}
      {...rest}
      disabled={disabled}
    >
      <div className="flex gap-2 items-center">
        {!disabled ? (
          children
        ) : loading ? (
          <span className="flex gap-2 items-center justify-center">
            {children} <Loader />{" "}
          </span>
        ) : (
          children
        )}
      </div>
    </button>
  );
};

export default Button;
