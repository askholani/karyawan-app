const SelectInput = ({
  label,
  id,
  options = [],
  register = () => ({}),
  error,
  className = "",
  onChange,
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="form-label text-sm fw-medium">
        {label} *
      </label>
      <select
        id={id}
        className={`form-select text-sm ${error ? "is-invalid" : ""} py-1`}
        {...register(id, {
          onChange: (e) => {
            onChange && onChange(e.target.value);
          },
        })}
      >
        <option value="">Pilih salah satu</option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
};

export default SelectInput;
