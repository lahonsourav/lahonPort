const CTA = () => {
  // let time = new Date().toLocaleTimeString();
  // const [currentTime, setCurrentTime] = useState(time);

  // const updateTime = () => {
  //   let time = new Date().toLocaleTimeString();
  //   setCurrentTime(time);
  // };

  // setInterval(updateTime, 1000);
  return (
    <div className="cta">
      <a href="../../assets/resume.pdf" download className="btn">
        Resume
      </a>

      <a href="#portfolio" download className="btn btn-primary">
        Projects
      </a>
    </div>
  );
};

export default CTA;
