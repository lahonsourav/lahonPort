import cv from "./resume.pdf";

const CTA = () => {
  return (
    <div className="cta">
      <a href={cv} download="Sourav_Lahon_Resume" className="btn">
        Resume
      </a>

      <a href="#portfolio" className="btn ">
        Projects
      </a>
    </div>
  );
};

export default CTA;


