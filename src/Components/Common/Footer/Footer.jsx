import React from 'react';
import { Link } from 'react-router';
import logo from '../../../assets/logoL.png';
import { FaFacebookF, FaInstagram, FaLinkedinIn,  FaPinterestP } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-green-800 text-base-content px-20 py-10 items-center">

      <div className='shadow-2xl p-10 flex flex-col items-center'>
        <img className="w-20" src={logo} alt="" />
        <p className="font-bold text-5xl">GreenNest</p>
        <p><small>- Indoor Plant Care & Store</small></p>
      </div>

      <nav>
        <h6 className="footer-title text-xl font-bold">Quick Links</h6>
        <Link to="/about" className="link link-hover text-lg">About</Link>
        <Link to="/contact" className="link link-hover text-lg">Contact</Link>
        <Link to="/privacy-policy" className="link link-hover text-lg">Privacy Policy</Link>
      </nav>

      <nav>
        <h6 className="footer-title text-xl font-bold">Follow Us</h6>
        <div className="grid grid-cols-2 gap-5">

          

         
          <a href="https://www.facebook.com/"><FaFacebookF size={25}/></a>
          <a href="https://www.instagram.com/"><FaInstagram size={25}/></a>
          <a href="https://www.pinterest.com/"><FaPinterestP size={25}/></a>
          <a href="https://x.com/"><FaXTwitter size={25}/></a>
          <a href="https://www.linkedin.com/"><FaLinkedinIn size={25}/></a>
        </div>
      </nav>

      <nav className="text-center sm:text-right mt-8 sm:mt-0">
        <p>© 2025 GreenNest. All rights reserved.</p>
      </nav>
    </footer>
  );
};

export default Footer;