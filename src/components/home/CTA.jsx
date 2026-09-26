import './cts.css';
import { useNavigate } from 'react-router-dom';

const CTA = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="cta">
        <div className="btn btn-primary" onClick={() => navigate("/blog")}>
          Blog
        </div>
        <div className="btn" onClick={() => navigate("/travel")}>
          Travel
        </div>
      </div>

      <span className="cta-scroll-hint" aria-hidden="true">
        scroll
        <span className="cta-scroll-chevron">⌄</span>
      </span>
    </>
  );
};

export default CTA;
