import { useState } from "react";
import { Plot, Point, Line, Theme, useMovablePoint } from "mafs";
import ConceptPage from "../../components/ConceptPage.jsx";
import Slider from "../../components/Slider.jsx";
import Graph from "../../components/Graph.jsx";
import Formula from "../../components/Formula.jsx";
import { money } from "../../components/format.js";

export default function ExpectedValue() {
  const [prize, setPrize] = useState(100); // what you win
  const [cost, setCost] = useState(20);    // what you pay to play (lost if you lose)

  // A point you can drag left/right to choose the win probability.
  // "horizontal" keeps it on the x-axis; we clamp p between 0 and 1 ourselves.
  const pointer = useMovablePoint([30, 0], {
    // x is the win chance in PERCENT (0 to 100); y stays 0
    constrain: ([x]) => [Math.round(Math.min(100, Math.max(0, x))), 0],
    color: Theme.red,
  });
  const p = pointer.x / 100; // convert percent to a probability between 0 and 1

  // E[X] = p * (prize - cost) + (1 - p) * (-cost) = p * prize - cost
  const ev = (q) => q * prize - cost; // q is a probability (0 to 1)
  const breakEven = cost / prize;

  return (
    <ConceptPage
      title="Expected Value"
      intuition={
        <p>
          Expected value is the <b>average result</b> if you could repeat a
          decision many times: multiply each outcome by its probability and add
          them up. A bet with positive expected value wins on average, even if
          any single try can lose. It lets you compare choices that are
          uncertain using a single number.
        </p>
      }
      application={
        <>
          <p>
            <b>Decision under uncertainty.</b> You pay {money(cost)} for a chance to
            win {money(prize)}. Drag the red dot to set your chance of winning. At
            p = {(p * 100).toFixed(0)}% the expected value is{" "}
            <b>{money(ev(p))}</b> per play, so the bet is{" "}
            {ev(p) > 0 ? "worth taking on average" : ev(p) < 0 ? "a losing bet on average" : "exactly fair"}.
            You need at least a {(breakEven * 100).toFixed(1)}% chance to break even.
          </p>
          <p>
            <b>Same idea elsewhere:</b> an ad shown to 1,000 people earns
            (click probability) × (revenue per click) per view; a recommendation
            system ranks items by expected relevance.
          </p>
        </>
      }
      summary={
        <>
          <p>
            Expected value weights every outcome by how likely it is. For a
            win-or-lose bet it equals p × prize − cost. It is positive exactly
            when p is above the break-even probability cost ÷ prize.
          </p>
          <Formula block tex="E[X]=\sum_i x_i\,p_i \qquad E[\text{bet}] = p\cdot\text{prize}-\text{cost}" />
        </>
      }
      source="OpenStax Precalculus 2e, Chapter 11 (Sequences, Probability and Counting Theory), Section 11.7 Probability (expected value of a game)."
    >
      <div className="controls">
        <Slider label="Prize if you win" value={prize} min={10} max={500} step={10} onChange={setPrize} format={money} />
        <Slider label="Cost to play" value={cost} min={1} max={200} onChange={setCost} format={money} />
      </div>
      {/* x: probability of winning (0 to 1). y: expected value in dollars. */}
      <Graph x={[-10, 110]} y={[-220, 520]} height={320}>
        <Plot.OfX y={(x) => ev(x / 100)} domain={[0, 100]} color={Theme.blue} />
        <Point x={breakEven * 100} y={0} color={Theme.green} />
        <Line.Segment point1={[p * 100, 0]} point2={[p * 100, ev(p)]} color={Theme.red} style="dashed" />
        <Point x={p * 100} y={ev(p)} color={Theme.red} />
        {pointer.element}
      </Graph>
      <p className="muted">
        Horizontal: probability of winning, in percent. Vertical: expected value per play in dollars.
        Green dot: break-even probability.
      </p>
      <table>
        <thead><tr><th>Outcome</th><th>Probability</th><th>Net result</th></tr></thead>
        <tbody>
          <tr><td>Win</td><td>{(p * 100).toFixed(0)}%</td><td>{money(prize - cost)}</td></tr>
          <tr><td>Lose</td><td>{((1 - p) * 100).toFixed(0)}%</td><td>{money(-cost)}</td></tr>
          <tr><td><b>Expected value</b></td><td></td><td><b>{money(ev(p))}</b></td></tr>
        </tbody>
      </table>
    </ConceptPage>
  );
}
