import { useFormContext } from "react-hook-form";

function OutlineInput({
  type = "text",
  name,
  defaultValue = "",
  label,
  disabled = false,
}) {
  const { register } = useFormContext();

  if (type === "textarea") {
    return (
      <div className={`outlined-input ${disabled ? "disabled" : ""}`}>
        <textarea
          name={name}
          placeholder=" "
          defaultValue={defaultValue}
          {...register(name, { required: true })}
          disabled={disabled}
        ></textarea>
        <label htmlFor={name}>{label}</label>
      </div>
    );
  }

  return (
    <div className={`outlined-input ${disabled ? "disabled" : ""}`}>
      <input
        type={type}
        name={name}
        placeholder=" "
        // defaultValue={defaultValue}
        value={defaultValue}
        {...register(name, { required: true })}
        disabled={disabled}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}

export default OutlineInput;
