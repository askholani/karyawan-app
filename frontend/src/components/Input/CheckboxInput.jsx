const CheckboxInput = ({
  label,
  name,
  options,
  register,
  error,
  setValue,
  watch,
  className,
}) => {
  const selectedValues = watch(name) || [];

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const updatedValues = checked
      ? [...selectedValues, value]
      : selectedValues.filter((v) => v !== value);

    setValue(name, updatedValues);
  };

  return (
    <div className={`${className || ""}`}>
      <label className="form-label text-sm fw-medium">{label} *</label>
      <div className="d-grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {/* Bagian Checkbox (Kiri) */}
        <div className="d-flex flex-column">
          {options.left.map((opt) => (
            <div className="form-check" key={opt.value}>
              <input
                className="form-check-input"
                type="checkbox"
                value={opt.value}
                id={opt.value}
                checked={selectedValues.includes(opt.value)}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor={opt.value}>
                {opt.label}
              </label>
            </div>
          ))}
        </div>

        {/* Bagian Radio Button (Kanan) */}
        <div className="d-flex flex-column">
          {options.right.map((opt) => (
            <div className="form-check" key={opt.value}>
              {opt.input ? (
                <>
                  <label className="form-check-label" htmlFor="other">
                    Lainnya
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    {...register(name)}
                    value="other"
                    id="other"
                  />
                  <input
                    type="text"
                    className="form-control mt-1 py-1"
                    placeholder="Lainnya"
                    {...register(`${name}_lainnya`)}
                  />
                </>
              ) : (
                <>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={opt.value}
                    id={opt.value}
                    checked={selectedValues.includes(opt.value)}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label" htmlFor={opt.value}>
                    {opt.label}
                  </label>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {error && <div className="text-danger text-sm">{error.message}</div>}
    </div>
  );
};

export default CheckboxInput;
