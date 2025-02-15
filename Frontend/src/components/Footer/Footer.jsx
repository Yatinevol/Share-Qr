import { Link } from "react-router-dom"
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { FiSend } from "react-icons/fi"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-100 text-gray-600 py-8" style={{backgroundColor:"oklch(0.26 0.03 256.32)"}}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">QR Spark</h2>
            <p className="mb-4">Share your qr easily with your friends.</p>
            <p>&copy; {currentYear} QR Share. All rights reserved.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-500 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-blue-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Me</h3>
            <div className="flex ml-18 space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors"
              >
                <FaXTwitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors"
              >
                <FaLinkedinIn size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

