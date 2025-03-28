const TextInput = ({ label, id, register, error, className, type }) => (
  <div className={`${className || ""}`}>
    <label htmlFor={id} className="form-label text-sm fw-medium">
      {label} *
    </label>
    <input
      type={type || "text"}
      className={`form-control text-sm py-1 ${error ? "is-invalid" : ""}`}
      id={id}
      {...register(id)}
    />
    {error && <div className="invalid-feedback">{error.message}</div>}
  </div>
);

export default TextInput;
