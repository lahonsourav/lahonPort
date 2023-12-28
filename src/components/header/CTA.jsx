import cv from "./resume.pdf";

const CTA = () => {
  return (
    <div className="cta">
      <a href={cv} download="sourav_lahon_resume" className="btn">
        Resume
      </a>

      <a href="#portfolio" className="btn btn-primary">
        Projects
      </a>
    </div>
  );
};

export default CTA;

// let time = new Date().toLocaleTimeString();
// const [currentTime, setCurrentTime] = useState(time);

// const updateTime = () => {
//   let time = new Date().toLocaleTimeString();
//   setCurrentTime(time);
// };

// setInterval(updateTime, 1000);
