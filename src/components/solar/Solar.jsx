import React from "react";
import "./solar.css";

const Solar = () => {
  return (
    <div class="clearfix">
      <ul class="solarsystem">
        <li class="sun">
         
        </li>
        <li class="mercury">
          <span></span>
        </li>
        <li class="venus">
          <span>credits</span>
        </li>
        <li class="earth">
          <span>
            <span class="moon"></span>
          </span>
        </li>
        <li class="mars">
         
            <span>contact</span>
     
        </li>
        <li class="asteroids_meteorids">
          <span></span>
        </li>
        <li class="jupiter">
         
            <span>experience</span>
 
        </li>
        <li class="saturn">
        
          <span>
            current
               <span class="ring"></span>
            </span>
        
        </li>
        <li class="uranus">
         
            <span>education</span>
         
        </li>
        <li class="neptune">
         
            <span>about</span>

        </li>
        <li class="pluto">
        
            <span></span>

        </li>
      </ul>
    </div>
  );
};

export default Solar;
