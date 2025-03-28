const RadioInput = ({ label, name, options, register, error }) => (
  <div className="mb-2">
    <label className="form-label text-sm fw-medium">{label} *</label>
    <div className="d-flex column-gap-5">
      {options.map(({ value, label }) => (
        <div className="form-check" key={value}>
          <input
            className="form-check-input"
            type="radio"
            {...register(name)}
            value={value}
            id={value}
          />
          <label className="form-check-label" htmlFor={value}>
            {label}
          </label>
        </div>
      ))}
    </div>
    {error && <div className="text-danger text-sm">{error.message}</div>}
  </div>
);

export default RadioInput;
