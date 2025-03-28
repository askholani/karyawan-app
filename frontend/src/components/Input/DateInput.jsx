const DateInput = ({ label, id, register, error, className }) => {
  return (
    <div className={`${className || ""}`}>
      <label htmlFor={id} className="form-label text-sm fw-medium">
        {label} *
      </label>
      <div className="input-group">
        <span className="input-group-text bg-white cursor-pointer">
          <i className="bi bi-calendar2-week"></i>
        </span>
        <input
          type="date"
          className={`form-control py-1 text-sm ${error ? "is-invalid" : ""}`}
          id={id}
          {...register(id)}
        />
        {error && <div className="invalid-feedback">{error.message}</div>}
      </div>
    </div>
  );
};

export default DateInput;
