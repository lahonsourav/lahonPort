import "./PageFooter.css";

const PageFooter = ({ children, className = "" }) => (
  <div className={`page-footer ${className}`}>{children}</div>
);

export default PageFooter;
