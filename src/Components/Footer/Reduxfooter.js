import React from "react";
import { AiFillInstagram, AiOutlineGoogle } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import './Reduxfooter.scss'

const Footer = () => {
  return (
    <div class="footer">
      <div class="footer__social">
        <a href="#">
          <AiFillInstagram />
        </a>
        <a href="#">
          <FaFacebook />
        </a>
        <a href="#">
          <AiOutlineGoogle />
        </a>
       
      </div>
      <ul class="footer__list-inline">
        <li class="footer__list-inline-item">
          <a href="#">Home</a>
        </li>
        <li class="footer__list-inline-item">
          <a href="#">Services</a>
        </li>
        <li class="footer__list-inline-item">
          <a href="#">About</a>
        </li>
        <li class="footer__list-inline-item">
          <a href="#">Terms</a>
        </li>
       
      </ul>
      <p class="footer__copyright">Company Name © 2018</p>
    </div>
  );
};

export default Footer;
