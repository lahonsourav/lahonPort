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
    </>
  );
};

export default CTA;
