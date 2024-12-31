import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import useAuth from "../AuthPorvider/useAuth";

const Footer = () => {
  const { loading } = useAuth();
  if (loading) return <div></div>;
  return (
    <footer className="bg-[#0e1216] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Newsletter Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <div className="flex justify-center">
            <input
              type="email"
              placeholder="Enter mail"
              className="p-2 rounded-l-lg text-black"
            />
            <button className="bg-white text-green-500 px-4 py-2 rounded-r-lg">
              Subscribe
            </button>
          </div>
        </div>

        {/* Footer Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center  justify-between  md:text-left">
          <div>
            <h3 className="text-4xl font-bold mb-2">QueryNest</h3>
            <p>
              Get customized recommendations to find the best products suited to
              your needs, making your shopping experience effortless and
              enjoyable.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2  md:text-center">About us</h3>
            <ul className="space-y-2  md:text-center">
              <li>Features</li>
              <li>Testimonials</li>
              <li>Screenshots</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Contact us</h3>
            <p>hello@qquery.com</p>
            <p>38 Kingston Drive Avenue</p>
            <p>West Lafayette, IN 47906</p>
            <p>8 100 8765 1229</p>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4 mt-8">
          <a
            href="https://www.facebook.com/profile.php?id=100032484008187"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-green-500 p-3 rounded-full hover:bg-gray-200"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://x.com/aminul_islam_S"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-green-500 p-3 rounded-full hover:bg-gray-200"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.linkedin.com/in/md-aminul-islam-showrov/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-green-500 p-3 rounded-full hover:bg-gray-200"
          >
            <FaInstagram />
          </a>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-8">
          <p>Copyright © 2024 All Rights Reserved by QueryNest</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
