import React from 'react';
import { Link } from 'react-router';
import logo from '../../../assets/logoL.png';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPinterestP } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-green-800 text-base-content px-4 sm:px-8 lg:px-20 py-6 sm:py-8 lg:py-10 items-center">

      <div className='shadow-2xl p-4 sm:p-6 lg:p-10 flex flex-col  items-center w-full sm:w-auto '>
        <img className="w-16  sm:w-20" src={logo} alt=""  />
        <p className="font-bold text-3xl sm:text-4xl lg:text-5xl">GreenNest</p>
        <p><small>- Indoor Plant Care & Store</small></p>
      </div>
      <nav className="flex flex-col items-center sm:items-start w-full sm:w-auto">
        <h6 className="footer-title text-lg sm:text-xl font-bold">Quick Links</h6>
        <Link to="/about" className="link link-hover text-base sm:text-lg">About</Link>
        <Link to="/contact" className="link link-hover text-base sm:text-lg">Contact</Link>

        <Link to="/privacy-policy" className="link link-hover text-base sm:text-lg">Privacy Policy</Link>
      </nav>

      <nav className="flex flex-col items-center sm:items-start w-full sm:w-auto">
        <h6 className="footer-title text-lg sm:text-xl font-bold">Follow Us</h6>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 sm:gap-5">
          <a href="https://www.facebook.com/" ><FaFacebookF size={25} /></a>
          <a href="https://www.instagram.com/"><FaInstagram size={25} /></a>
          <a href="https://www.pinterest.com/"><FaPinterestP size={25} /></a>
          <a href="https://x.com/"><FaXTwitter size={25} /></a>
          <a href="https://www.linkedin.com/"><FaLinkedinIn size={25} /></a>
        </div>
      </nav>

      <nav className="flex flex-col   items-center sm:items-end mt-8 sm:mt-0 w-full sm:w-auto">
        <p>© 2025 GreenNest. All rights reserved.</p>
      </nav>
    </footer>
  );
};

export default Footer;