import { Link } from "react-router-dom"
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"
import { FiSend } from "react-icons/fi"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-100 text-gray-600 py-8" style={{backgroundColor:"oklch(0.26 0.03 256.32)"}}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">QR Share</h2>
            <p className="mb-4">Share your content easily with our QR code generator.</p>
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
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors"
              >
                <FaFacebookF size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors"
              >
                <FaTwitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors"
              >
                <FaInstagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Subscribe to our newsletter</h4>
              <form className="flex" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors flex items-center"
                >
                  <FiSend size={18} />
                  <span className="sr-only">Subscribe</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

