import React from 'react';
import './homePage.css';
import Header from '../components/header/Header';
import CTA from './CTA';


const HomeMenu = () => {



  return (
    <div className="homePage">
      <Header />
      <CTA/>

      <div className="footer__copyright_home">
       
        <div className="footer__copyright__youtube">
          <small>
            <a
              href="https://github.com/lahonsourav/lahonPort"
              target="_blank"
              rel="noreferrer"
            >
              srcCode &nbsp;
            </a>
            |
            <a
              href="https://github.com/lahonsourav/lahonPort?tab=readme-ov-file#readme"
              target="_blank"
              rel="noreferrer"
            >
              &nbsp; Credits
            </a>
          </small>
          
          <small>&copy;&nbsp; www.lahon.in 2025</small>
        </div>
      </div>
    </div>
  );
};

export default HomeMenu;
