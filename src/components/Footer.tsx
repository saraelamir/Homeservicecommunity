import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#F5F5F5] border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h4 className="mb-4 text-[#4FC3F7]">SMARTFIX</h4>
            <p className="text-sm text-gray-600 mb-4">
              Connecting you with trusted local service providers in Cairo, Egypt for all your home maintenance needs.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-gray-600 hover:text-[#4FC3F7] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#4FC3F7] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#4FC3F7] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-[#4FC3F7] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-[#4FC3F7] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-[#4FC3F7] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-[#4FC3F7] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/service/electrician" className="text-gray-600 hover:text-[#4FC3F7] transition-colors">
                  Electrical Work
                </Link>
              </li>
              <li>
                <Link to="/service/plumber" className="text-gray-600 hover:text-[#4FC3F7] transition-colors">
                  Plumbing
                </Link>
              </li>
              <li>
                <Link to="/service/cleaning" className="text-gray-600 hover:text-[#4FC3F7] transition-colors">
                  House Cleaning
                </Link>
              </li>
              <li>
                <Link to="/service/garden" className="text-gray-600 hover:text-[#4FC3F7] transition-colors">
                  Garden Work
                </Link>
              </li>
              <li>
                <Link to="/service/painting" className="text-gray-600 hover:text-[#4FC3F7] transition-colors">
                  Interior Painting
                </Link>
              </li>
              <li>
                <Link to="/service/ac-repair" className="text-gray-600 hover:text-[#4FC3F7] transition-colors">
                  AC Repair
                </Link>
              </li>
              <li>
                <Link to="/service/pest-control" className="text-gray-600 hover:text-[#4FC3F7] transition-colors">
                  Pest Control
                </Link>
              </li>
              <li>
                <Link to="/service/washing-machine-repair" className="text-gray-600 hover:text-[#4FC3F7] transition-colors">
                  Washing Machine Repair
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4 text-[#4FC3F7]" />
                <span>smartfix088@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4 text-[#4FC3F7]" />
                <span>0932789887</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4 text-[#4FC3F7]" />
                <span>Cairo, Egypt</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-sm text-gray-600">
            &copy; 2025 SMARTFIX. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}