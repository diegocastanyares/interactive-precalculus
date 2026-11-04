import { useState } from "react";
import { Plot, Point, Theme } from "mafs";
import ConceptPage from "../../components/ConceptPage.jsx";
import Slider from "../../components/Slider.jsx";
import Graph from "../../components/Graph.jsx";
import Formula from "../../components/Formula.jsx";
import { pct } from "../../components/format.js";

// Bayes' rule for a medical test.
// prior = P(disease), sens = P(+ | disease), spec = P(- | healthy)
function posterior(prior, sens, spec) {
  const truePos = sens * prior;
  const falsePos = (1 - spec) * (1 - prior);
  return truePos / (truePos + falsePos);
}

export default function Bayes() {
  const [prior, setPrior] = useState(0.01);  // prevalence: 1% of people have the disease
  const [sens, setSens] = useState(0.9);     // sensitivity (true positive rate)
  const [spec, setSpec] = useState(0.9);     // specificity (true negative rate)

  const post = posterior(prior, sens, spec);

  // Picture of 1000 people. Count how many fall in each group.
  const N = 1000;
  const sick = Math.round(N * prior);
  const truePos = Math.round(sick * sens);
  const falseNeg = sick - truePos;
  const healthy = N - sick;
  const falsePos = Math.round(healthy * (1 - spec));
  const trueNeg = healthy - falsePos;

  // Each person is one square; the color shows their group. Order: TP, FN, FP, TN.
  const groups = [
    { name: "Sick, test positive", count: truePos, color: Theme.red },
    { name: "Sick, test negative", count: falseNeg, color: Theme.orange },
    { name: "Healthy, test positive", count: falsePos, color: Theme.violet },
    { name: "Healthy, test negative", count: trueNeg, color: "#d0d4dc" },
  ];
  const squares = groups.flatMap((g) => Array.from({ length: g.count }, () => g.color));

  return (
    <ConceptPage
      title="Bayesian Updating: a Medical Test"
      intuition={
        <p>
          You start with a belief (the <b>prior</b>): how common is the disease?
          Then you see evidence, a positive test, and update your belief using
          how reliable the test is (the <b>likelihood</b>). The new belief is the{" "}
          <b>posterior</b>. The surprise: if the disease is rare, most positive
          results are false alarms, because a few percent of a huge healthy
          group outnumbers most of a tiny sick group.
        </p>
      }
      application={
        <p>
          <b>Medicine and AI.</b> With a prevalence of {pct(prior)}, a test with{" "}
          {pct(sens, 0)} sensitivity and {pct(spec, 0)} specificity gives a
          positive result in the following way. Out of 1000 people, {truePos + falsePos} test positive
          but only {truePos} are really sick. So a positive means only a{" "}
          <b>{pct(post)}</b> chance of disease. Spam filters and many AI
          classifiers use exactly this update: prior (how common is spam) times
          evidence (the words in the email) gives the probability this email is spam.
        </p>
      }
      summary={
        <>
          <p>
            Bayes' rule updates a prior belief with evidence. The posterior depends
            on the prior as much as on the test quality: rare conditions need very
            accurate tests to make a positive result convincing.
          </p>
          <Formula block tex="P(D\mid +)=\frac{P(+\mid D)\,P(D)}{P(+\mid D)\,P(D)+P(+\mid \neg D)\,P(\neg D)}" />
        </>
      }
      source="OpenStax Precalculus 2e, Chapter 11 (Sequences, Probability and Counting Theory), Section 11.7 Probability (conditional probability); Bayes' rule is an extension of that section."
    >
      <div className="controls">
        <Slider label="Prior: prevalence P(disease)" value={prior} min={0.001} max={0.5} step={0.001} onChange={setPrior} format={(v) => pct(v)} />
        <Slider label="Likelihood: sensitivity P(+ | disease)" value={sens} min={0.5} max={0.999} step={0.001} onChange={setSens} format={(v) => pct(v)} />
        <Slider label="Likelihood: specificity P(- | healthy)" value={spec} min={0.5} max={0.999} step={0.001} onChange={setSpec} format={(v) => pct(v)} />
      </div>

      <div className="readout">
        <div><small>Posterior P(disease | positive)</small><b>{pct(post)}</b></div>
        <div><small>Positives who are sick</small><b>{truePos} of {truePos + falsePos}</b></div>
      </div>

      <h3>1000 people</h3>
      {/* Plain SVG grid: 50 squares per row */}
      <svg viewBox="0 0 500 100" width="100%" role="img" aria-label="1000 people colored by test outcome">
        {squares.map((color, i) => (
          <rect key={i} x={(i % 50) * 10 + 1} y={Math.floor(i / 50) * 5 * 1 + 0} width="8" height="4" fill={color} />
        ))}
      </svg>
      <div className="legend">
        {groups.map((g) => (
          <span key={g.name}><i style={{ background: g.color }} />{g.name}: {g.count}</span>
        ))}
      </div>

      <h3>Posterior as the prior changes</h3>
      <Graph x={[0, 1]} y={[0, 1]} height={280}>
        <Plot.OfX y={(x) => posterior(x, sens, spec)} domain={[0.0001, 1]} color={Theme.blue} />
        <Point x={prior} y={post} color={Theme.red} />
      </Graph>
      <p className="muted">Horizontal: prior probability. Vertical: probability of disease after a positive test. Red dot: your current settings.</p>
    </ConceptPage>
  );
}
