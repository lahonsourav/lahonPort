import "./PageFooter.css";

const PageFooter = ({ children, className = "" }) => (
  <div className={`page-footer ${className}`}>
    <button
      type="button"
      className="page-footer-top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      ↑ Back to top
    </button>
    <div className="page-footer-copyright">{children}</div>
  </div>
);

export default PageFooter;
