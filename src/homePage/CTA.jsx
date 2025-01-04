import { Link } from "react-router-dom";
import cv from "./resume.pdf";
import './cts.css';

const CTA = () => {
  return (<>
    <div className="cta">
      <a href={cv} download="Sourav_Lahon_Resume" className="btn">
        Resume
      </a>

      <Link to="/home" className="btn spbtn">
        Portfolio
      </Link>
    </div>

     <div className="cta">
      <Link to="/solar" className="btn">
        Solar navigate
      </Link>

      <Link to="/askme" className="btn">
        Ask anything
      </Link>

    
    </div>

      <div className="cta">
      

      <Link to="/home" className="btn">
        Music
      </Link>
    </div>
    </>
    
  );
};

export default CTA;
