import './cts.css';
import cv from "../assets/resume.pdf";
import { useNavigate } from 'react-router-dom';


const CTA = () => {

  const navigate = useNavigate();
  return (<>
    <div className="cta">
      <a href={cv} target="_blank" rel="noopener noreferrer" className="btn">
        Resume : pdf
      </a>

      <div className="btn btn-primary" onClick={() => navigate("/professional")} >
        Professional
      </div>
    </div >
  </>
  );
};

export default CTA;
