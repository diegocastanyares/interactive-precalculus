import { Link } from "react-router-dom";
import { chapters } from "../chapters.js";

// Home page: loops over the chapters registry and prints an index.
export default function Home() {
  return (
    <>
      <h1>Interactive Precalculus</h1>
      <p className="lead">
        Short, hands-on explanations of precalculus ideas, each connected to
        finance, decisions under uncertainty, interfaces or AI. Drag the
        sliders and see the math move.
      </p>
      {chapters.map((chapter) => (
        <section key={chapter.id} className="chapter">
          <h2>{chapter.title}</h2>
          <p className="muted">OpenStax Precalculus 2e, {chapter.openstax}</p>
          <ul className="concept-list">
            {chapter.concepts.map((c) => (
              <li key={c.id}>
                <Link to={`/concept/${c.id}`}>
                  <strong>{c.title}</strong>
                  <span>{c.blurb}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
