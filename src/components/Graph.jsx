import { Mafs, Coordinates } from "mafs";

// Pick a "nice" grid step (1, 2, 5, 10, 20, 50...) so a range shows about 8 lines.
// Without this, Mafs would draw one grid line per unit, which is far too many
// when the range is large (e.g. 0 to 10,000).
function niceStep([min, max]) {
  const raw = (max - min) / 8;
  const power = Math.pow(10, Math.floor(Math.log10(raw)));
  const fraction = raw / power;
  const nice = fraction < 1.5 ? 1 : fraction < 3.5 ? 2 : fraction < 7.5 ? 5 : 10;
  return nice * power;
}

// Avoid labels like 2.6000000000000005 caused by floating point arithmetic.
const label = (v) => String(Number(v.toPrecision(8)));

// Thin wrapper around <Mafs> so every graph has the same size and axes.
// Pass x and y as [min, max] ranges; children are the curves/points to draw.
export default function Graph({ x = [-1, 10], y = [-1, 10], height = 340, children }) {
  return (
    <div className="graph">
      <Mafs height={height} viewBox={{ x, y, padding: 0 }} preserveAspectRatio={false} pan={false} zoom={false}>
        <Coordinates.Cartesian
          xAxis={{ lines: niceStep(x), labels: label }}
          yAxis={{ lines: niceStep(y), labels: label }}
          subdivisions={false}
        />
        {children}
      </Mafs>
    </div>
  );
}
