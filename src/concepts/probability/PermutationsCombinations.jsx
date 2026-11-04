import { useState } from "react";
import { Point, Theme } from "mafs";
import ConceptPage from "../../components/ConceptPage.jsx";
import Slider from "../../components/Slider.jsx";
import Graph from "../../components/Graph.jsx";
import Formula from "../../components/Formula.jsx";

const COLORS = ["#e03131", "#f08c00", "#2f9e44", "#1c7ed6", "#7048e8", "#d6336c", "#0b7285"];
const LETTERS = "ABCDEFG";

const factorial = (k) => (k <= 1 ? 1 : k * factorial(k - 1));
const nPr = (n, r) => factorial(n) / factorial(n - r);
const nCr = (n, r) => factorial(n) / (factorial(r) * factorial(n - r));

// Build every ordered selection of r items from [0..n-1] (order matters).
function listPermutations(n, r, limit) {
  const out = [];
  function build(current) {
    if (out.length >= limit) return;
    if (current.length === r) { out.push(current); return; }
    for (let i = 0; i < n; i++) {
      if (!current.includes(i)) build([...current, i]);
    }
  }
  build([]);
  return out;
}

// Build every unordered selection (order does not matter): keep indexes increasing.
function listCombinations(n, r) {
  const out = [];
  function build(start, current) {
    if (current.length === r) { out.push(current); return; }
    for (let i = start; i < n; i++) build(i + 1, [...current, i]);
  }
  build(0, []);
  return out;
}

// A small colored circle with a letter.
function Token({ i }) {
  return <span className="token" style={{ background: COLORS[i] }}>{LETTERS[i]}</span>;
}

export default function PermutationsCombinations() {
  const [n, setN] = useState(5);
  const [r, setR] = useState(3);
  const [mode, setMode] = useState("combinations"); // "permutations" | "combinations"

  // If n is lowered below r, keep r valid.
  const rSafe = Math.min(r, n);

  const perms = nPr(n, rSafe);
  const combs = nCr(n, rSafe);
  const SHOW = 30; // do not render thousands of chips
  const items = mode === "permutations"
    ? listPermutations(n, rSafe, SHOW)
    : listCombinations(n, rSafe).slice(0, SHOW);
  const total = mode === "permutations" ? perms : combs;

  return (
    <ConceptPage
      title="Permutations and Combinations"
      intuition={
        <p>
          Counting without listing. If <b>order matters</b> (a podium: gold,
          silver, bronze) you count <b>permutations</b>. If <b>order does not
          matter</b> (a team of three) you count <b>combinations</b>. Every team
          of 3 can be lined up in 3! = 6 orders, so permutations are exactly
          6 times more numerous than combinations: nCr = nPr ÷ r!.
        </p>
      }
      application={
        <>
          <p>
            <b>Decisions and security.</b> A 4-digit PIN (order matters, digits can
            repeat) has 10<sup>4</sup> = 10,000 possibilities. A lottery that picks 6 of 49
            numbers ignores order, so there are{" "}
            <b>{nCr(49, 6).toLocaleString("en-US")}</b> tickets and your chance is 1 in
            that number. <b>Interfaces:</b> choosing which 3 of {n} filters to show
            on a screen has {nCr(n, 3)} combinations, but showing them in a specific
            order has {nPr(n, 3)} layouts.
          </p>
        </>
      }
      summary={
        <>
          <p>
            Permutations count ordered selections, combinations count unordered
            ones. Dividing by r! removes the duplicate orderings. The values
            nCr across r form a row of Pascal's triangle (also the binomial coefficients).
          </p>
          <Formula block tex="P(n,r)=\frac{n!}{(n-r)!}\qquad C(n,r)=\frac{n!}{r!\,(n-r)!}" />
        </>
      }
      source="OpenStax Precalculus 2e, Chapter 11 (Sequences, Probability and Counting Theory), Section 11.5 Counting Principles."
    >
      <div className="controls">
        <Slider label="Items to choose from (n)" value={n} min={2} max={7} onChange={setN} />
        <Slider label="Items chosen (r)" value={rSafe} min={1} max={n} onChange={setR} />
        <div className="button-row">
          <button className={mode === "permutations" ? "" : "secondary"} onClick={() => setMode("permutations")}>
            Order matters (permutations)
          </button>
          <button className={mode === "combinations" ? "" : "secondary"} onClick={() => setMode("combinations")}>
            Order does not matter (combinations)
          </button>
        </div>
      </div>

      <div className="readout">
        <div><small>P({n},{rSafe}) permutations</small><b>{perms.toLocaleString("en-US")}</b></div>
        <div><small>C({n},{rSafe}) combinations</small><b>{combs.toLocaleString("en-US")}</b></div>
        <div><small>Ratio P / C = r!</small><b>{factorial(rSafe)}</b></div>
      </div>

      <p>
        Showing {items.length} of {total.toLocaleString("en-US")}{" "}
        {mode === "permutations" ? "ordered" : "unordered"} selections:
      </p>
      <div className="chips">
        {items.map((sel, idx) => (
          <span className="chip" key={idx}>
            {sel.map((i) => <Token key={i} i={i} />)}
          </span>
        ))}
      </div>

      <h3>C({n}, r) for every r</h3>
      <Graph x={[-0.5, n + 0.5]} y={[-1, Math.max(nCr(n, Math.floor(n / 2)) * 1.2, 4)]} height={240}>
        {Array.from({ length: n + 1 }, (_, k) => (
          <Point key={k} x={k} y={nCr(n, k)} color={k === rSafe ? Theme.red : Theme.blue} />
        ))}
      </Graph>
    </ConceptPage>
  );
}
