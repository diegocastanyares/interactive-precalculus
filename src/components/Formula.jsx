import katex from "katex";

// Renders a LaTeX string, e.g. <Formula tex="A = P(1+r)^t" />.
// Use block for a centered formula on its own line.
export default function Formula({ tex, block = false }) {
  const html = katex.renderToString(tex, { displayMode: block, throwOnError: false });
  return (
    <span
      className={block ? "formula-block" : undefined}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
