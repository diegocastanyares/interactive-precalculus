import { useState } from "react";
import { Plot, Theme } from "mafs";
import ConceptPage from "../../components/ConceptPage.jsx";
import Slider from "../../components/Slider.jsx";
import Graph from "../../components/Graph.jsx";
import Formula from "../../components/Formula.jsx";
import { money } from "../../components/format.js";

// Options for how often interest is added to the balance per year.
const FREQUENCIES = [
  { label: "Yearly", n: 1 },
  { label: "Quarterly", n: 4 },
  { label: "Monthly", n: 12 },
  { label: "Daily", n: 365 },
];

export default function CompoundInterest() {
  const [principal, setPrincipal] = useState(1000);
  const [rate, setRate] = useState(0.06);
  const [n, setN] = useState(12);
  const [years, setYears] = useState(20);

  // A(t) = P (1 + r/n)^(n t)
  const compound = (t) => principal * Math.pow(1 + rate / n, n * t);
  // For comparison: simple interest never earns interest on interest.
  const simple = (t) => principal * (1 + rate * t);

  const final = compound(years);

  return (
    <ConceptPage
      title="Compound Interest"
      intuition={
        <p>
          With compound interest, the interest you earn is added to your balance
          and <b>starts earning interest too</b>. The more often it is added
          (monthly instead of yearly) the sooner the interest begins to work,
          so you end with a bit more. Frequency helps, but it has a limit, which
          you will see on the next page.
        </p>
      }
      application={
        <p>
          <b>Finance.</b> Investing {money(principal)} at {(rate * 100).toFixed(1)}%
          for {years} years, compounded {FREQUENCIES.find((f) => f.n === n).label.toLowerCase()},
          grows to <b>{money(final)}</b>. Of that, {money(final - principal)} is interest;
          simple interest would have given only {money(simple(years) - principal)}.
          The same math works in reverse for debt: a credit card compounds
          against you.
        </p>
      }
      summary={
        <>
          <p>
            Compounding earns interest on interest. The balance after t years
            depends on the principal P, the annual rate r, the number of
            compounding periods per year n, and the time t.
          </p>
          <Formula block tex="A(t) = P\left(1+\frac{r}{n}\right)^{nt}" />
        </>
      }
      source="OpenStax Precalculus 2e, Chapter 4 (Exponential and Logarithmic Functions), Section 4.1 Exponential Functions (compound interest)."
    >
      <div className="controls">
        <Slider label="Principal" value={principal} min={100} max={10000} step={100} onChange={setPrincipal} format={money} />
        <Slider label="Annual rate" value={rate} min={0.01} max={0.15} step={0.005} onChange={setRate} format={(v) => `${(v * 100).toFixed(1)}%`} />
        <Slider label="Years" value={years} min={1} max={40} onChange={setYears} format={(v) => `${v}`} />
        <div className="button-row">
          {FREQUENCIES.map((f) => (
            <button
              key={f.n}
              className={f.n === n ? "" : "secondary"}
              onClick={() => setN(f.n)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      {/* The y range depends on the largest value shown, so the curve always fits */}
      <Graph x={[0, 40]} y={[0, Math.max(compound(40), simple(40)) * 1.05]}>
        <Plot.OfX y={simple} color={Theme.blue} style="dashed" />
        <Plot.OfX y={compound} color={Theme.green} />
      </Graph>
      <div className="legend">
        <span><i style={{ background: Theme.green }} />Compound</span>
        <span><i style={{ background: Theme.blue }} />Simple interest (dashed)</span>
      </div>
      <div className="readout">
        <div><small>Balance after {years} years</small><b>{money(final)}</b></div>
        <div><small>Interest earned</small><b>{money(final - principal)}</b></div>
      </div>
    </ConceptPage>
  );
}
