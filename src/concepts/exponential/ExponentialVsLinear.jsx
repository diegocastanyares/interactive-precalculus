import { useState } from "react";
import { Plot, Point, Theme } from "mafs";
import ConceptPage from "../../components/ConceptPage.jsx";
import Slider from "../../components/Slider.jsx";
import Graph from "../../components/Graph.jsx";
import Formula from "../../components/Formula.jsx";

export default function ExponentialVsLinear() {
  // useState: remembers a value between renders. [value, functionToChangeIt]
  const [rate, setRate] = useState(0.15); // growth rate per period (15%)
  const start = 100;

  // Linear: add the same amount each period.   y = start * (1 + rate * x)
  const linear = (x) => start * (1 + rate * x);
  // Exponential: multiply by the same factor.   y = start * (1 + rate)^x
  const exponential = (x) => start * Math.pow(1 + rate, x);

  // First period where exponential overtakes linear (None if it never happens in 0..30).
  let crossover = null;
  for (let t = 1; t <= 30; t++) {
    if (exponential(t) > linear(t)) { crossover = t; break; }
  }

  return (
    <ConceptPage
      title="Exponential vs. Linear Growth"
      intuition={
        <>
          <p>
            Linear growth <b>adds</b> the same amount every period: +10, +10, +10.
            Exponential growth <b>multiplies</b> by the same factor every period:
            ×1.1, ×1.1, ×1.1. At first they look alike, but each multiplication
            works on a bigger number than the last, so the exponential curve
            keeps accelerating and eventually leaves the line far behind.
          </p>
        </>
      }
      application={
        <>
          <p>
            <b>Product growth (interfaces).</b> Suppose an app has 100 users.
            Plan A adds a fixed share of the original base each week (linear).
            Plan B grows users by the same percentage of the <i>current</i> base
            each week through referrals (exponential). Move the slider: with{" "}
            {Math.round(rate * 100)}% per week, after 30 weeks Plan A has{" "}
            <b>{Math.round(linear(30)).toLocaleString()}</b> users and Plan B has{" "}
            <b>{Math.round(exponential(30)).toLocaleString()}</b>.
          </p>
        </>
      }
      summary={
        <>
          <p>
            Linear change adds a constant amount; exponential change multiplies
            by a constant factor. Even a small rate wins in the long run, but
            early on the two can be almost indistinguishable.
          </p>
          <Formula block tex="\text{linear: } y = y_0(1+rx) \qquad \text{exponential: } y = y_0(1+r)^x" />
        </>
      }
      source="OpenStax Precalculus 2e, Chapter 4 (Exponential and Logarithmic Functions), Section 4.1 Exponential Functions."
    >
      <div className="controls">
        <Slider
          label="Growth rate per period"
          value={rate} min={0.01} max={0.5} step={0.01}
          onChange={setRate}
          format={(v) => `${Math.round(v * 100)}%`}
        />
      </div>
      <Graph x={[0, 30]} y={[0, 3000]}>
        <Plot.OfX y={linear} color={Theme.blue} />
        <Plot.OfX y={exponential} color={Theme.red} />
        {crossover && <Point x={crossover} y={exponential(crossover)} color={Theme.foreground} />}
      </Graph>
      <div className="legend">
        <span><i style={{ background: Theme.blue }} />Linear</span>
        <span><i style={{ background: Theme.red }} />Exponential</span>
      </div>
      <p>
        {crossover
          ? <>The exponential curve overtakes the line at period <b>{crossover}</b> (black dot).</>
          : <>The exponential curve has not overtaken the line within 30 periods. Try a larger rate.</>}
      </p>
    </ConceptPage>
  );
}
