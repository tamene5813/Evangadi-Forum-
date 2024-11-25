import React from "react";
import "./footer.css";
import logo from "../../assets/evangadi-logo-footer.png";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="footer__container">
      <div className="link_wraper">
        <div>
          <img className="footer__logo" src={logo} alt="evangadi-logo" />
          <div className="socila__link">
            <a href="">
              <FaFacebookF />
            </a>
            <a href="">
              <FaInstagram />
            </a>
            <a href="">
              <FaYoutube />
            </a>
          </div>
        </div>
        <div>
          <ul className="useful_link">
            <li>Useful Link</li>
            <li>
              <a href="">How it works</a>
            </li>
            <li>
              <a href="">Terms of Service</a>
            </li>
            <li>
              <a href="">Privacy policy</a>
            </li>
          </ul>
        </div>
        <div className="useful_link">
          <ul>
            <li className="">Contact Info</li>
            <li>Evangadi Networks</li>
            <li>support@evangadi.com</li>
            <li>+1-202-386-2702</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
