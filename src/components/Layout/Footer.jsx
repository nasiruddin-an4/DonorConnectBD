import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-primary-400" />
              <span className="text-2xl font-bold">DonorConnect</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Building the largest donor community in Bangladesh. Connecting
              those in need with generous donors across blood, organ, and
              charity donations.
            </p>
            <p className="text-sm text-gray-400">Open • Free • For Everyone</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/search"
                  className="text-gray-300 hover:text-primary-400 transition-colors"
                >
                  Search Donors
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-gray-300 hover:text-primary-400 transition-colors"
                >
                  Become a Donor
                </Link>
              </li>
              <li>
                <Link
                  to="/donors"
                  className="text-gray-300 hover:text-primary-400 transition-colors"
                >
                  Donor Directory
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-primary-400 transition-colors"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300 text-sm">
                  contact@donorconnect.org
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300 text-sm">+880-1XXX-XXXXXX</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300 text-sm">Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 DonorConnect. Made with ❤️ for Bangladesh. All rights
            reserved{" "}
            <a
              href="https://www.facebook.com/nasiruddin.an4/"
              target="_blank"
              className="text-primary-600"
            >
              Nasir Uddin
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
