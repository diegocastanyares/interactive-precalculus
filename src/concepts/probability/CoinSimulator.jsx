import { useState } from "react";
import { Line, Theme } from "mafs";
import ConceptPage from "../../components/ConceptPage.jsx";
import Slider from "../../components/Slider.jsx";
import Graph from "../../components/Graph.jsx";
import Formula from "../../components/Formula.jsx";
import { pct } from "../../components/format.js";

export default function CoinSimulator() {
  const [p, setP] = useState(0.5);          // true probability of heads
  const [flips, setFlips] = useState([]);   // list of results: 1 = heads, 0 = tails

  // Add `count` random flips to the list. We build a NEW array (never mutate state).
  function flip(count) {
    const more = Array.from({ length: count }, () => (Math.random() < p ? 1 : 0));
    setFlips([...flips, ...more]);
  }

  // Running proportion of heads after each flip: heads so far / flips so far.
  let heads = 0;
  const running = flips.map((f, i) => {
    heads += f;
    return heads / (i + 1);
  });

  // Draw at most ~150 segments so the graph stays fast with thousands of flips.
  const step = Math.max(1, Math.floor(flips.length / 150));
  const points = [];
  for (let i = 0; i < running.length; i += step) points.push([i + 1, running[i]]);
  if (running.length) points.push([running.length, running[running.length - 1]]);

  const xMax = Math.max(flips.length, 10);

  return (
    <ConceptPage
      title="Probability and the Law of Large Numbers"
      intuition={
        <p>
          The probability of an event is the fraction of times it would happen
          if you repeated the experiment endlessly. For a fair coin, P(heads) =
          1/2. A few flips can be very lopsided (3 heads in a row is common!),
          but as the number of flips grows, the observed fraction settles near
          the true probability. That settling is the <b>law of large numbers</b>.
        </p>
      }
      application={
        <p>
          <b>Decisions under uncertainty.</b> A casino can lose on one spin yet
          is nearly certain to profit over millions, because the long-run
          fraction follows the probabilities. The same idea underlies A/B testing
          in interfaces: a button that "wins" after 10 clicks may be luck; after
          10,000 clicks the observed rate is trustworthy. In AI, evaluating a model
          on more test examples makes its measured accuracy converge to its true accuracy.
        </p>
      }
      summary={
        <>
          <p>
            Probability is the long-run relative frequency. With few trials the
            observed fraction wanders; with many trials it converges to the true
            probability. More data means less noise.
          </p>
          <Formula block tex="P(E)=\frac{\text{favorable outcomes}}{\text{total outcomes}}\qquad \frac{\text{heads}}{n}\to p \text{ as } n\to\infty" />
        </>
      }
      source="OpenStax Precalculus 2e, Chapter 11 (Sequences, Probability and Counting Theory), Section 11.7 Probability."
    >
      <div className="controls">
        <Slider label="True probability of heads" value={p} min={0.05} max={0.95} step={0.05}
          onChange={(v) => { setP(v); setFlips([]); /* new coin: start over */ }}
          format={(v) => v.toFixed(2)} />
        <div className="button-row">
          <button onClick={() => flip(1)}>Flip 1</button>
          <button onClick={() => flip(10)}>Flip 10</button>
          <button onClick={() => flip(100)}>Flip 100</button>
          <button onClick={() => flip(1000)}>Flip 1000</button>
          <button className="secondary" onClick={() => setFlips([])}>Reset</button>
        </div>
      </div>

      <Graph x={[0, xMax]} y={[0, 1]}>
        {/* The true probability as a dashed reference line */}
        <Line.ThroughPoints point1={[0, p]} point2={[1, p]} color={Theme.red} style="dashed" />
        {/* The observed running proportion, drawn segment by segment */}
        {points.slice(1).map((pt, i) => (
          <Line.Segment key={i} point1={points[i]} point2={pt} color={Theme.blue} />
        ))}
      </Graph>
      <p className="muted">Horizontal: number of flips. Vertical: fraction of heads so far. Red dashed line: the true p.</p>
      <div className="readout">
        <div><small>Flips</small><b>{flips.length}</b></div>
        <div><small>Heads</small><b>{heads}</b></div>
        <div><small>Observed fraction</small><b>{flips.length ? pct(heads / flips.length) : "-"}</b></div>
        <div><small>True probability</small><b>{pct(p)}</b></div>
      </div>
    </ConceptPage>
  );
}
