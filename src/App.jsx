import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ConceptRoute from "./pages/ConceptRoute.jsx";

// App decides which page to show depending on the URL.
export default function App() {
  return (
    <>
      <header className="site-header">
        <Link to="/" className="site-title">
          Interactive Precalculus
        </Link>
        <span className="site-sub">Based on OpenStax Precalculus 2e</span>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/concept/:id" element={<ConceptRoute />} />
          <Route path="*" element={<p>Page not found. <Link to="/">Go home</Link></p>} />
        </Routes>
      </main>
      <footer className="site-footer">
        Content adapted from OpenStax Precalculus 2e, licensed under CC BY 4.0.
      </footer>
    </>
  );
}
