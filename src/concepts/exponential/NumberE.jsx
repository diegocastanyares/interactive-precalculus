import { useState } from "react";
import { Plot, Point, Line, Theme } from "mafs";
import ConceptPage from "../../components/ConceptPage.jsx";
import Slider from "../../components/Slider.jsx";
import Graph from "../../components/Graph.jsx";
import Formula from "../../components/Formula.jsx";
import { money } from "../../components/format.js";

export default function NumberE() {
  // We slide through powers of 2 to cover 1 up to about a million periods.
  const [power, setPower] = useState(3);
  const n = Math.pow(2, power);

  // Value of (1 + 1/n)^n for a given n: compounding 100% a year, n times.
  const f = (k) => Math.pow(1 + 1 / k, k);

  // Continuous vs. discrete compounding for an investment.
  const P = 10000, r = 0.08, t = 10;
  const monthly = P * Math.pow(1 + r / 12, 12 * t);
  const continuous = P * Math.exp(r * t);

  return (
    <ConceptPage
      title="The Number e and Continuous Compounding"
      intuition={
        <p>
          Imagine a bank paying 100% interest per year on $1. Paid once: $2.
          Paid twice (50% each time): $2.25. Paid monthly: about $2.613. More
          payments help less and less, and the total creeps toward a fixed
          number, <b>e ≈ 2.71828</b>. So e is the natural limit of "compounding
          all the time", and it is why e shows up whenever growth feeds on itself.
        </p>
      }
      application={
        <>
          <p>
            <b>Finance.</b> {money(P)} at {r * 100}% for {t} years: compounded monthly it becomes{" "}
            <b>{money(monthly)}</b>; compounded continuously, <b>{money(continuous)}</b>. The
            difference is only {money(continuous - monthly)}, so compounding more often
            quickly stops mattering.
          </p>
          <p>
            <b>AI.</b> The same number appears in the softmax function that turns a
            model's scores into probabilities: each score s becomes e<sup>s</sup>{" "}
            divided by the sum of all e<sup>s</sup> values. Exponentials make every
            score positive and amplify the biggest one.
          </p>
        </>
      }
      summary={
        <>
          <p>
            As the number of compounding periods n grows, (1 + 1/n)<sup>n</sup> approaches e.
            With continuous compounding, a principal P at annual rate r grows to
            P·e<sup>rt</sup> after t years.
          </p>
          <Formula block tex="e=\lim_{n\to\infty}\left(1+\frac1n\right)^n \qquad A(t)=Pe^{rt}" />
        </>
      }
      source="OpenStax Precalculus 2e, Chapter 4 (Exponential and Logarithmic Functions), Section 4.1 Exponential Functions (the number e, continuous growth)."
    >
      <div className="controls">
        <Slider
          label="Compounding periods n"
          value={power} min={0} max={20}
          onChange={setPower}
          format={() => n.toLocaleString("en-US")}
        />
      </div>
      <Graph x={[0, 20]} y={[1.5, 3]}>
        {/* The curve (1+1/x)^x for x from 1 on */}
        <Plot.OfX y={f} domain={[1, 20]} color={Theme.blue} />
        {/* The horizontal line y = e */}
        <Line.ThroughPoints point1={[0, Math.E]} point2={[1, Math.E]} color={Theme.red} style="dashed" />
        {/* The chosen n (the graph only shows up to x = 20, so the dot is clamped) */}
        <Point x={Math.min(n, 20)} y={f(n)} color={Theme.foreground} />
      </Graph>
      <div className="readout">
        <div><small>n</small><b>{n.toLocaleString("en-US")}</b></div>
        <div><small>(1 + 1/n)^n</small><b>{f(n).toFixed(6)}</b></div>
        <div><small>e</small><b>{Math.E.toFixed(6)}</b></div>
      </div>
      <p className="muted">The dashed red line is e. The dot is clamped to the right edge for n above 20.</p>
    </ConceptPage>
  );
}
