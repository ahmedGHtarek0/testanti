import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiYoutube, FiMapPin, FiMail, FiPhone } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-white/5 pt-20 pb-10 mt-auto">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div>
            <Link to="/" className="text-3xl font-heading font-black tracking-tighter text-white flex items-center gap-1 mb-6">
              TITAN<span className="text-gym-neon">.FIT</span>
            </Link>
            <p className="text-gray-400 mb-6 font-light leading-relaxed">
              Push your limits. Redefine what's possible. The future of fitness is here.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-gym-neon hover:text-black transition-all">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-gym-neon hover:text-black transition-all">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-gym-neon hover:text-black transition-all">
                <FiYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-heading font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-gray-400 hover:text-gym-neon transition-colors">About Us</Link></li>
              <li><Link to="/trainers" className="text-gray-400 hover:text-gym-neon transition-colors">Our Trainers</Link></li>
              <li><Link to="/classes" className="text-gray-400 hover:text-gym-neon transition-colors">Classes schedule</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-gym-neon transition-colors">Pricing Plans</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-heading font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/faq" className="text-gray-400 hover:text-gym-neon transition-colors">FAQs</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-gym-neon transition-colors">Contact Us</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-gym-neon transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-gym-neon transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-heading font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-gym-neon mt-1" size={20} />
                <span className="text-gray-400">123 Cyber Street, Neon City, TX 75001</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-gym-neon" size={20} />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-gym-neon" size={20} />
                <span className="text-gray-400">hello@titan.fit</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center pr-6 gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Titan Fit. All rights reserved.</p>
          <p className="text-gray-500 text-sm flex gap-2">Built with <span className="text-gym-neon">Power</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
