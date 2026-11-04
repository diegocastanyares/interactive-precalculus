// Shared layout for every concept: the same 5 sections in the same order.
// Each concept passes its content in as props (props = inputs to a component).
export default function ConceptPage({
  title,
  intuition,     // 1. short plain-language explanation
  children,      // 2. the interactive visualization (what goes between the tags)
  application,   // 3. a real-world example
  summary,       // 4. 3-4 lines + key formula
  source,        // 5. OpenStax chapter and section
}) {
  return (
    <article className="concept">
      <h1>{title}</h1>

      <section>
        <h2>1. Intuition</h2>
        {intuition}
      </section>

      <section>
        <h2>2. Interactive visualization</h2>
        {children}
      </section>

      <section>
        <h2>3. Application</h2>
        {application}
      </section>

      <section className="summary">
        <h2>4. Summary</h2>
        {summary}
      </section>

      <section>
        <h2>5. Source</h2>
        <p className="muted">{source}</p>
      </section>
    </article>
  );
}
