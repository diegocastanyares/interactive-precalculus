import { useParams, Link } from "react-router-dom";
import { allConcepts } from "../chapters.js";

// Reads :id from the URL, finds the matching concept and renders its component.
export default function ConceptRoute() {
  const { id } = useParams();
  const concept = allConcepts.find((c) => c.id === id);

  if (!concept) return <p>Unknown concept. <Link to="/">Go home</Link></p>;

  const Concept = concept.component; // a component stored in a variable (capital letter!)
  return (
    <>
      <Link to="/" className="back">← All concepts</Link>
      <Concept />
    </>
  );
}
