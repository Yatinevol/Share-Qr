import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { FaXTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa6';

const FooterLink = memo(({ to, children }) => (
  <Link 
    to={to} 
    className="block text-gray-300 hover:text-white transition-colors duration-200 h-8 leading-8"
  >
    {children}
  </Link>
));

const SocialLink = memo(({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center w-10 h-10 text-gray-300 hover:text-white transition-colors duration-200"
  >
    <Icon className="w-5 h-5" aria-hidden="true" />
    <span className="sr-only">{label}</span>
  </a>
));

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer 
      className="w-full min-h-[300px] py-8 bg-[oklch(0.26_0.03_256.32)]"
      style={{ contain: 'layout' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 h-full">
          {/* Brand Section - Fixed height container */}
          <div className="col-span-1 md:col-span-2 flex flex-col min-h-[160px]">
            <h2 className="text-2xl font-bold text-white h-8 mb-4">QR Spark</h2>
            <p className="text-gray-300 h-12 mb-4">Share your QR easily with your friends.</p>
            <p className="text-gray-400 text-sm h-6 mt-auto">
              &copy; {currentYear} QR Share. All rights reserved.
            </p>
          </div>

          {/* Quick Links - Fixed height container */}
          <nav className="flex flex-col min-h-[160px]">
            <h3 className="text-lg font-semibold text-white h-8 mb-4">Quick Links</h3>
            <ul className="space-y-2 flex-1">
              {[
                { to: "/", text: "Home" },
                { to: "/about", text: "About" },
                { to: "/privacy", text: "Privacy Policy" }
              ].map((link) => (
                <li key={link.to} className="h-8">
                  <FooterLink to={link.to}>{link.text}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Links - Fixed height container */}
          <div className="flex flex-col min-h-[160px]">
            <h3 className="text-lg font-semibold text-white h-8 mb-4">Connect With Me</h3>
            <div className="flex space-x-4 h-10">
              {[
                { href: "https://x.com/YatinSi36775440", icon: FaXTwitter, label: "Twitter" },
                { href: "https://www.linkedin.com/in/yatin-singh-01110a24a/", icon: FaLinkedinIn, label: "LinkedIn" },
                {
                  href : "https://github.com/Yatinevol",icon: FaGithub, label: "Github"
                }
              ].map((social) => (
                <SocialLink 
                  key={social.href}
                  href={social.href}
                  icon={social.icon}
                  label={social.label}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);  