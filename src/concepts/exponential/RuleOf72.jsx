import { useState } from "react";
import { Plot, Point, Line, Text, Theme } from "mafs";
import ConceptPage from "../../components/ConceptPage.jsx";
import Slider from "../../components/Slider.jsx";
import Graph from "../../components/Graph.jsx";
import Formula from "../../components/Formula.jsx";

export default function RuleOf72() {
  const [ratePct, setRatePct] = useState(6); // annual growth rate in percent

  const growth = (t) => Math.pow(1 + ratePct / 100, t);
  // The inverse question. Solve (1+r)^t = 2 with a logarithm:
  const exactDoubling = Math.log(2) / Math.log(1 + ratePct / 100);
  // The mental-math shortcut:
  const rule72 = 72 / ratePct;

  return (
    <ConceptPage
      title="Logarithms and the Rule of 72"
      intuition={
        <p>
          An exponential answers "I wait t years: how much do I have?" A
          logarithm asks the <b>inverse question</b>: "I want to double my money:
          how many years do I wait?" Doubling means growth factor 2, so we need
          the exponent t that makes (1+r)<sup>t</sup> = 2. That exponent is
          exactly what a logarithm returns. Since ln 2 ≈ 0.693, a quick
          approximation is: years to double ≈ 72 ÷ rate in percent.
        </p>
      }
      application={
        <>
          <p>
            <b>Finance / inflation.</b> At {ratePct}% a year, money doubles in about{" "}
            <b>{exactDoubling.toFixed(1)}</b> years (the rule of 72 says {rule72.toFixed(1)}).
            Read it backwards for inflation: at {ratePct}% inflation, prices double and
            your cash loses half its purchasing power in the same time.
          </p>
        </>
      }
      summary={
        <>
          <p>
            A logarithm undoes an exponential: it finds the exponent. The time to
            double at rate r solves (1+r)<sup>t</sup> = 2, giving a logarithm.
            The rule of 72 is a handy approximation, best for rates around 6 to 10%.
          </p>
          <Formula block tex="t=\frac{\ln 2}{\ln(1+r)}\approx\frac{72}{100\,r}" />
        </>
      }
      source="OpenStax Precalculus 2e, Chapter 4 (Exponential and Logarithmic Functions), Section 4.3 Logarithmic Functions and Section 4.6 Exponential and Logarithmic Equations."
    >
      <div className="controls">
        <Slider label="Annual growth rate" value={ratePct} min={1} max={30} onChange={setRatePct} format={(v) => `${v}%`} />
      </div>
      <Graph x={[0, 40]} y={[0, 8]}>
        <Plot.OfX y={growth} color={Theme.green} />
        {/* Horizontal line at 2x (doubled) */}
        <Line.ThroughPoints point1={[0, 2]} point2={[1, 2]} color={Theme.foreground} style="dashed" opacity={0.5} />
        {/* Vertical drop line at the doubling time */}
        <Line.Segment point1={[exactDoubling, 0]} point2={[exactDoubling, 2]} color={Theme.red} />
        <Point x={exactDoubling} y={2} color={Theme.red} />
        <Text x={exactDoubling} y={2.4} attach="e" attachDistance={8}>
          {`t = ${exactDoubling.toFixed(1)} years`}
        </Text>
      </Graph>
      <p className="muted">Vertical axis: growth factor (1 means your starting amount). Horizontal axis: years.</p>
      <table>
        <thead>
          <tr><th>Rate</th><th>Exact (logarithm)</th><th>Rule of 72</th></tr>
        </thead>
        <tbody>
          {[2, 4, 6, 8, 12, 24].map((r) => (
            <tr key={r}>
              <td>{r}%</td>
              <td>{(Math.log(2) / Math.log(1 + r / 100)).toFixed(2)} years</td>
              <td>{(72 / r).toFixed(2)} years</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ConceptPage>
  );
}
