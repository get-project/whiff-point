import { useState, useEffect, useContext } from 'react'
import { assets } from "../../public/assets/assets";
import { NavLink, Link } from 'react-router'
import StoreContext from '../context/StoreContext.js';
import { useAuth0 } from "@auth0/auth0-react";
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
// import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const navigation = [
  { name: 'HOME', path: '/' },
  { name: 'MENU', path: '/menu' },
  { name: 'ABOUT', path: '/about' },
  { name: 'CONTACT', path: '/contact' },
  // { name: 'Early Access', path: '/early-access', special: true }
];

function Navbar() {
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { cartItems } = useContext(StoreContext);
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 50;

      if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
        setIsScrollingDown(true);
      } else if (currentScrollY < lastScrollY) {
        setIsScrollingDown(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    },
    hidden: {
      y: -100,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  // Calculate cart total
  const cartTotal = Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);

  // Handle cart click
  const handleCartClick = (e) => {
    if (cartTotal === 0) {
      e.preventDefault(); // Prevent navigation if cart is empty
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: "Your cart is empty! Add items to proceed.",
      //   // footer: '<a href="#">Why do I have this issue?</a>'
      // });
      // Or use a toast library like react-toastify:
      toast.info("Your cart is empty! Add items to proceed.");
    }
  };

  // Add mobile menu variants for animations
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  return (
    <>
      <motion.nav
        variants={navVariants}
        animate={isScrollingDown ? "hidden" : "visible"}
        initial="visible"
        className="fixed top-0 left-0 right-0 z-50 px-4 py-2"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="bg-white/90 backdrop-blur-md rounded-full px-6 py-3 flex items-center justify-between"
            style={{
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
          >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img src={assets.logo_img} className="w-12 h-12" alt="logo" />
              <span className="font-semibold text-gray-800">Whiff-Point</span>
            </Link>

            {/* Center Navigation - hide on mobile */}
            <div className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => `
                    relative px-3 py-1 text-sm transition-colors
                    ${item.special
                      ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-1.5 rounded-full hover:shadow-lg'
                      : isActive
                        ? 'text-orange-500'
                        : 'text-gray-600 hover:text-orange-500'
                    }
                  `}
                >
                  {item.name}
                  {!item.special && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-orange-500 w-full origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </NavLink>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Cart */}
              <Link
                to="/cart"
                onClick={handleCartClick}
                className={`relative p-2 rounded-full transition-colors ${cartTotal > 0
                  ? 'hover:bg-gray-100 cursor-pointer'
                  : 'cursor-not-allowed opacity-70'
                  }`}
              >
                <FiShoppingCart className="w-5 h-5" />
                {cartTotal > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center"
                  >
                    {cartTotal}
                  </motion.span>
                )}
              </Link>

              {/* Auth Button - Hide on mobile */}
              <div className="hidden md:block">
                {isAuthenticated ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm hover:shadow-lg transition-shadow"
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    <img src={user.picture} alt={user.name} className="w-6 h-6 rounded-full" />
                    Log Out
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm hover:shadow-lg transition-shadow"
                    onClick={() => loginWithRedirect()}
                  >
                    Log In
                  </motion.button>
                )}
              </div>

              {/* Hamburger Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <FiMenu className="w-6 h-6" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white z-50 md:hidden"
            >
              <div className="p-5">
                <div className="flex justify-between items-center mb-8">
                  <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <img src={assets.logo_img} className="w-10 h-10" alt="logo" />
                    <span className="font-semibold text-gray-800">Whiff-Point</span>
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <FiX className="w-6 h-6" />
                  </motion.button>
                </div>

                <div className="space-y-1">
                  {navigation.map((item) => (
                    <motion.div
                      key={item.name}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 40 }}
                    >
                      <NavLink
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) => `
                          block px-4 py-3 rounded-lg text-base transition-colors
                          ${item.special
                            ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                            : isActive
                              ? 'bg-orange-50 text-orange-500'
                              : 'text-gray-600 hover:bg-gray-50'
                          }
                        `}
                      >
                        {item.name}
                      </NavLink>
                    </motion.div>
                  ))}

                  {/* Auth Button in Mobile Menu */}
                  <div className="mt-6">
                    {isAuthenticated ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                          <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full" />
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium"
                          onClick={() => {
                            logout({ returnTo: window.location.origin });
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          Log Out
                        </motion.button>
                      </div>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium"
                        onClick={() => {
                          loginWithRedirect();
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Log In
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;