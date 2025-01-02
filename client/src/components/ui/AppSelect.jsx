import Select from "react-select";

const AppSelect = ({
  selectItems = [],
  handleChange,
  label = "",
  disabled,
  value,
  required = false,
}) => {
  return (
    <div className="inputGroup space-y-2">
      <label className="print:hidden">
        {label}
        <span className="text-red-600 font-extrabold">{required && " *"}</span>
      </label>
      <Select
        onChange={handleChange}
        options={selectItems}
        defaultValue={value}
        isDisabled={disabled}
      ></Select>
    </div>
  );
};

export default AppSelect;
