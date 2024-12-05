import React from "react";

import { BsInstagram } from "react-icons/bs";

import { GrFacebook } from "react-icons/gr";
import './social.css'


const Socials = () => {
    return (
        <>
            <div className="connectSocial">
                <div className="headersocials">

                    <a
                        href="https://www.instagram.com/la_h_on/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <BsInstagram />
                    </a>
                    <a
                        href="https://www.facebook.com/frustratedcollegian.lahon/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <GrFacebook />
                    </a>


                </div>


            </div>
        </>
    );
};

export default Socials;
