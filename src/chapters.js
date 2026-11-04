// THE REGISTRY: the single list that drives the home page and the routes.
// To add a concept: create its component, import it here, add one entry.

import ExponentialVsLinear from "./concepts/exponential/ExponentialVsLinear.jsx";
import CompoundInterest from "./concepts/exponential/CompoundInterest.jsx";
import NumberE from "./concepts/exponential/NumberE.jsx";
import RuleOf72 from "./concepts/exponential/RuleOf72.jsx";
import PermutationsCombinations from "./concepts/probability/PermutationsCombinations.jsx";
import CoinSimulator from "./concepts/probability/CoinSimulator.jsx";
import ExpectedValue from "./concepts/probability/ExpectedValue.jsx";
import Bayes from "./concepts/probability/Bayes.jsx";

export const chapters = [
  {
    id: "exponential-logarithmic",
    title: "Exponential and Logarithmic Functions",
    openstax: "Chapter 4",
    concepts: [
      { id: "exponential-vs-linear", title: "Exponential vs. Linear Growth",
        blurb: "Why a small growth rate eventually beats a big fixed increase.",
        component: ExponentialVsLinear },
      { id: "compound-interest", title: "Compound Interest",
        blurb: "Principal, rate, compounding frequency and time.",
        component: CompoundInterest },
      { id: "number-e", title: "The Number e and Continuous Compounding",
        blurb: "What happens when you compound infinitely often.",
        component: NumberE },
      { id: "rule-of-72", title: "Logarithms and the Rule of 72",
        blurb: "Logarithms as the inverse question: how long to double?",
        component: RuleOf72 },
    ],
  },
  {
    id: "sequences-probability-counting",
    title: "Sequences, Probability and Counting Theory",
    openstax: "Chapter 11",
    concepts: [
      { id: "permutations-combinations", title: "Permutations and Combinations",
        blurb: "Counting arrangements and selections, visually.",
        component: PermutationsCombinations },
      { id: "coin-simulator", title: "Probability and the Law of Large Numbers",
        blurb: "Flip coins and watch randomness settle down.",
        component: CoinSimulator },
      { id: "expected-value", title: "Expected Value",
        blurb: "Should you take the bet? Average outcome of a decision.",
        component: ExpectedValue },
      { id: "bayes", title: "Bayesian Updating: a Medical Test",
        blurb: "Prior, likelihood and posterior with a screening test.",
        component: Bayes },
    ],
  },
];

// Flat list of every concept (handy for routing and "next" links).
export const allConcepts = chapters.flatMap((ch) =>
  ch.concepts.map((c) => ({ ...c, chapter: ch }))
);
