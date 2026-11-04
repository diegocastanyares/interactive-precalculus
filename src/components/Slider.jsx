// A labelled slider. The PARENT owns the value (state) and passes it in;
// when the user drags, we call onChange so the parent can update its state.
export default function Slider({ label, value, min, max, step = 1, onChange, format }) {
  return (
    <label className="slider">
      <span className="slider-label">
        {label}: <strong>{format ? format(value) : value}</strong>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))} // inputs give strings, so convert
      />
    </label>
  );
}
